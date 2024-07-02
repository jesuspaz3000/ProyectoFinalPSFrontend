// src/components/TraverseTree.js
import React, { useState } from 'react';
import { traverseTree } from '../../api';
import styles from './TraverseTree.module.scss'

const TraverseTree = () => {
    const [keys, setKeys] = useState([]);
    const [error, setError] = useState('');

    const handleTraverse = async () => {
        const result = await traverseTree();
        setKeys(result.keys);
        setError(result.error);
    };

    return (
        <div className={styles.TraverseTree}>
            <h2>Imprimir arbol</h2>
            <button onClick={handleTraverse}>Imprimir</button>
            {error && <p>{error}</p>}
            {keys.length > 0 && (
                <ul>
                    {keys.map((key, index) => (
                        <li key={index}>{key}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TraverseTree;
