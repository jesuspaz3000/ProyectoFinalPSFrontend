import React, { useRef, useEffect, useCallback } from 'react';
import styles from './CanvasTree.module.scss';

const CanvasTree = ({ tree }) => {
    const canvasRef = useRef(null);

    const getTreeDepth = useCallback((node) => {
        if (!node || !node.children || node.children.length === 0) return 1;
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
        const nodeWidth = (node.keys && Array.isArray(node.keys)) ? node.keys.length * 40 : 40;
        if (!widthsAtDepth[depth]) widthsAtDepth[depth] = 0;
        widthsAtDepth[depth] = Math.max(widthsAtDepth[depth], nodeWidth);
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => getMaxWidthAtDepth(child, depth + 1, widthsAtDepth));
        }
        return widthsAtDepth;
    }, []);

    const drawNode = useCallback((ctx, node, x, y, width, scale) => {
        if (!node || !node.keys || !Array.isArray(node.keys) || node.keys.length === 0) {
            return;
        }

        const nodeWidth = node.keys.length * 40 * scale;
        const nodeHeight = 40 * scale;

        // Dibujar el nodo
        ctx.fillStyle = 'white';
        ctx.fillRect(x - nodeWidth / 2, y, nodeWidth, nodeHeight);
        ctx.strokeRect(x - nodeWidth / 2, y, nodeWidth, nodeHeight);

        // Dibujar las claves
        ctx.fillStyle = 'black';
        ctx.font = `${14 * scale}px Arial`;
        node.keys.forEach((key, index) => {
            const keyX = x - nodeWidth / 2 + index * 40 * scale + 10 * scale;
            ctx.fillText(key.toString(), keyX, y + 25 * scale);
        });

        // Dibujar los hijos
        if (node.children && Array.isArray(node.children)) {
            const childWidth = width / node.children.length;
            node.children.forEach((child, index) => {
                const childX = x - width / 2 + childWidth * (index + 0.5);
                const childY = y + 80 * scale;

                // Dibujar línea al hijo
                ctx.beginPath();
                ctx.moveTo(x, y + nodeHeight);
                ctx.lineTo(childX, childY);
                ctx.stroke();

                // Dibujar hijo recursivamente
                drawNode(ctx, child, childX, childY, childWidth, scale);
            });
        }
    }, []);

    const drawTree = useCallback((treeData) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const containerWidth = canvas.offsetWidth;
        const containerHeight = canvas.offsetHeight;

        // Ajusta el tamaño del canvas al contenedor
        canvas.width = containerWidth;
        canvas.height = containerHeight;

        // Asegurarse de que estamos trabajando con la estructura correcta del árbol
        const rootNode = treeData.tree || treeData;
        if (!rootNode || typeof rootNode !== 'object' || !rootNode.keys || rootNode.keys.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        // Calcular las dimensiones del árbol
        const depth = getTreeDepth(rootNode);
        const nodesAtDepth = getMaxNodesAtDepth(rootNode);
        const widthsAtDepth = getMaxWidthAtDepth(rootNode);
        const maxNodes = Math.max(...nodesAtDepth);
        const maxWidth = Math.max(...widthsAtDepth);
        const treeHeight = depth * 100;
        const treeWidth = maxNodes * maxWidth + 200;

        // Calcular el factor de escala para ajustar el árbol al canvas
        const scaleX = containerWidth / treeWidth;
        const scaleY = containerHeight / treeHeight;
        const scale = Math.min(scaleX, scaleY, 1);

        // Aplicar la escala
        ctx.scale(scale, scale);

        // Centrar el árbol
        const offsetX = (containerWidth / scale - treeWidth) / 2;
        const offsetY = (containerHeight / scale - treeHeight) / 2;
        ctx.translate(offsetX, offsetY);

        // Dibujar el árbol
        drawNode(ctx, rootNode, treeWidth / 2, 50, treeWidth, scale);
    }, [drawNode, getTreeDepth, getMaxNodesAtDepth, getMaxWidthAtDepth]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            drawTree(tree);
        });

        const currentCanvasRef = canvasRef.current;

        if (currentCanvasRef) {
            resizeObserver.observe(currentCanvasRef);
        }

        drawTree(tree);

        return () => {
            if (currentCanvasRef) {
                resizeObserver.unobserve(currentCanvasRef);
            }
        };
    }, [tree, drawTree]);

    return (
        <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default CanvasTree;
