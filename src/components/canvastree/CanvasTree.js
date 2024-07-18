import React, { useRef, useEffect, useCallback } from 'react';
import styles from './CanvasTree.module.scss';

const CanvasTree = ({ tree }) => {
    const canvasRef = useRef(null);

    const getTreeDepth = useCallback((node) => {
        if (!node) return 0;
        if (!node.children || node.children.length === 0) return 1;
        const childDepths = node.children.map(child => getTreeDepth(child));
        return 1 + Math.max(...childDepths);
    }, []);

    const getMaxNodesAtDepth = useCallback((node, depth = 0, nodesAtDepth = []) => {
        if (!node) return nodesAtDepth;
        if (!nodesAtDepth[depth]) nodesAtDepth[depth] = 0;
        nodesAtDepth[depth] += 1;
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => getMaxNodesAtDepth(child, depth + 1, nodesAtDepth));
        }
        return nodesAtDepth;
    }, []);

    const getMaxWidthAtDepth = useCallback((node, depth = 0, widthsAtDepth = []) => {
        if (!node) return widthsAtDepth;
        const nodeWidth = (node.keys && node.keys.length) ? node.keys.length * 40 : 40;
        if (!widthsAtDepth[depth]) widthsAtDepth[depth] = 0;
        widthsAtDepth[depth] = Math.max(widthsAtDepth[depth], nodeWidth);
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => getMaxWidthAtDepth(child, depth + 1, widthsAtDepth));
        }
        return widthsAtDepth;
    }, []);

    const drawNode = useCallback((ctx, node, x, y, width) => {
        if (!node) {
            console.warn('Intentando dibujar un nodo indefinido');
            return;
        }

        const nodeWidth = (node.keys && node.keys.length) ? node.keys.length * 40 : 40;
        const nodeHeight = 40;

        // Dibujar el nodo
        ctx.fillStyle = 'white';
        ctx.fillRect(x - nodeWidth / 2, y, nodeWidth, nodeHeight);
        ctx.strokeRect(x - nodeWidth / 2, y, nodeWidth, nodeHeight);

        // Dibujar las claves
        if (node.keys && Array.isArray(node.keys)) {
            ctx.fillStyle = 'black';
            ctx.font = '14px Arial';
            node.keys.forEach((key, index) => {
                const keyX = x - nodeWidth / 2 + index * 40 + 10; // Ajuste de 10 para centrar el texto
                ctx.fillText(key.toString(), keyX, y + 25);
            });
        } else {
            console.warn('Las claves del nodo no son un array:', node.keys);
        }

        // Dibujar los hijos
        if (node.children && Array.isArray(node.children)) {
            const childWidth = width / node.children.length;
            node.children.forEach((child, index) => {
                const childX = x - width / 2 + childWidth * (index + 0.5);
                const childY = y + 80;

                // Dibujar línea al hijo
                ctx.beginPath();
                ctx.moveTo(x, y + nodeHeight);
                ctx.lineTo(childX, childY);
                ctx.stroke();

                // Dibujar hijo recursivamente
                drawNode(ctx, child, childX, childY, childWidth);
            });
        }
    }, []);

    const drawTree = useCallback((treeData) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }
        if (!treeData) {
            console.error('Datos del árbol faltantes');
            return;
        }

        const ctx = canvas.getContext('2d');

        // Calcular el tamaño dinámico del canvas
        const depth = getTreeDepth(treeData.tree || treeData);
        const nodesAtDepth = getMaxNodesAtDepth(treeData.tree || treeData);
        const widthsAtDepth = getMaxWidthAtDepth(treeData.tree || treeData);
        const maxNodes = Math.max(...nodesAtDepth);
        const maxWidth = Math.max(...widthsAtDepth);
        const height = depth * 100; // Ajuste del factor de altura por nivel
        const width = maxNodes * maxWidth + 200; // Ajuste del factor de ancho por nodo máximo con un margen adicional

        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);

        // Manejar tanto el caso donde treeData es el árbol directamente como donde es un objeto que contiene el árbol
        const rootNode = treeData.tree || treeData;
        drawNode(ctx, rootNode, width / 2, 50, width);
    }, [drawNode, getTreeDepth, getMaxNodesAtDepth, getMaxWidthAtDepth]);

    useEffect(() => {
        const animationFrameId = requestAnimationFrame(() => drawTree(tree));
        return () => cancelAnimationFrame(animationFrameId);
    }, [tree, drawTree]);

    return (
        <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default CanvasTree;
