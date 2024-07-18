import React, { useState } from 'react';
import { initBTree } from '../../api';
import styles from './InitBTree.module.scss';

const InitBTree = ({ onInitialize }) => {
    const [degree, setDegree] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);
        const parsedDegree = parseInt(degree, 10);
        if (isNaN(parsedDegree) || parsedDegree < 2) {
            setMessage('El grado mínimo debe ser un número entero mayor o igual a 2.');
            setIsLoading(false);
            return;
        }
        try {
            const result = await initBTree(parsedDegree);
            console.log('Init BTree result:', result);
            
            if (result.tree) {
                onInitialize(result.tree);
                setMessage('Árbol B inicializado correctamente');
                setDegree(''); // Limpiar el input después de una inicialización exitosa
            } else {
                throw new Error(result.message || 'Error al inicializar el árbol');
            }
        } catch (error) {
            console.error('Error initializing BTree:', error);
            setMessage('Error al inicializar el árbol: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.InitBTree}>
            <h2>Inicializar BTree</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="Ingresa grado mínimo"
                    min="2"
                    required
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || degree === ''}>
                    {isLoading ? 'Inicializando...' : 'Inicializar'}
                </button>
            </form>
            {message && <p className={message.includes('Error') ? styles.error : styles.success}>{message}</p>}
        </div>
    );
};

export default InitBTree;