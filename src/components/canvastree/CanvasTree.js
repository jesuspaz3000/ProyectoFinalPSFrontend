import React, { useRef, useEffect } from 'react';
import styles from './CanvasTree.module.scss';

const CanvasTree = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // Aquí puedes agregar tu lógica de dibujo
    context.fillStyle = 'white';
    context.fillRect(10, 10, 50, 50);
  }, []);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} width={600} height={400} />
    </div>
  );
};

export default CanvasTree;
