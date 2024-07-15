import React, { useRef, useEffect } from 'react';
import styles from './CanvasTree.module.scss';

const drawNode = (context, node, x, y, level) => {
    if (!node || !node.keys) return;

    const nodeWidth = 40;
    const nodeHeight = 20;
    const margin = 20;
    const keys = node.keys || [];

    // Dibujar el nodo
    context.strokeRect(x, y, nodeWidth * keys.length, nodeHeight);
    keys.forEach((key, index) => {
        context.fillText(key, x + nodeWidth * index + 10, y + 15);
    });

    // Dibujar los hijos (si existen)
    const children = node.children || [];
    if (children.length > 0) {
        const childY = y + nodeHeight + margin;
        const childXOffset = (nodeWidth * keys.length) / (children.length + 1);

        children.forEach((child, index) => {
            if (child) {
                const childX = x + childXOffset * (index + 1) - nodeWidth / 2;
                context.beginPath();
                context.moveTo(x + nodeWidth * keys.length / 2, y + nodeHeight);
                context.lineTo(childX + nodeWidth / 2, childY);
                context.stroke();
                drawNode(context, child, childX, childY, level + 1);
            }
        });
    }
};

const drawTree = (context, tree) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (tree && tree.keys) {
        drawNode(context, tree, context.canvas.width / 2 - 20, 20, 0);
        // Dibujar los valores en orden en la parte inferior del canvas
        const keys = tree.keys || [];
        const startY = context.canvas.height - 30;
        keys.forEach((key, index) => {
            context.fillText(key, 10 + index * 40, startY);
        });
    }
};

const CanvasTree = ({ tree }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            drawTree(context, tree);
        }
    }, [tree]);

    return (
        <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} width={800} height={600} />
        </div>
    );
};

export default CanvasTree;