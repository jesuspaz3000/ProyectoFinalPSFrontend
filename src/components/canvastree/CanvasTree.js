// src/components/CanvasTree.js
import React, { useRef, useEffect } from 'react';
import styles from './CanvasTree.module.scss';

const CanvasTree = ({ keys = [] }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Limpiar el canvas antes de dibujar
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar las claves en el canvas
    context.fillStyle = 'black';
    keys.forEach((key, index) => {
      context.fillText(key, 10, 20 * (index + 1)); // Ejemplo de dibujar texto en posiciones diferentes
    });
  }, [keys]);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} width={600} height={400} />
    </div>
  );
};

export default CanvasTree;
