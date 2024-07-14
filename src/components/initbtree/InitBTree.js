// src/components/initbtree/InitBTree.js
import React, { useState } from 'react';
import { initBTree } from '../../api';
import styles from './InitBTree.module.scss';

const InitBTree = ({ setDegree }) => {
    const [degree, setLocalDegree] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await initBTree(degree);
        setMessage(result.message || result.error);
        setDegree(degree);
    };

    return (
        <div className={styles.InitBTree}>
            <h2>Inicializar BTree</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={degree}
                    onChange={(e) => setLocalDegree(e.target.value)}
                    placeholder="Ingresa grado"
                />
                <button type="submit">Inicializar</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default InitBTree;
