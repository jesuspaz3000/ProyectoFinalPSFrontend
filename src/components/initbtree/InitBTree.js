import React, { useState } from 'react';
import { initBTree } from '../../api';
import styles from './InitBTree.module.scss';

const InitBTree = ({ setTree }) => {
    const [degree, setDegree] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const result = await initBTree(parseInt(degree, 10));
            console.log('Init BTree result:', result);
            
            if (result.tree) {
                setTree(result);
                setMessage('Árbol B inicializado correctamente');
            } else {
                setMessage(result.message || 'Error al inicializar el árbol');
            }
        } catch (error) {
            console.error('Error initializing BTree:', error);
            setMessage('Error al inicializar el árbol: ' + error.message);
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
                />
                <button type="submit">Inicializar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default InitBTree;
