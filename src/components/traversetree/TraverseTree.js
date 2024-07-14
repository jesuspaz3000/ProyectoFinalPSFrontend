// src/components/TraverseTree.js
import React, { useState } from 'react';
import { traverseTree } from '../../api';
import styles from './TraverseTree.module.scss';

const TraverseTree = ({ setKeys }) => {
    const [error, setError] = useState('');

    const handleTraverse = async () => {
        const result = await traverseTree();
        if (result.keys) {
            setKeys(result.keys);
        } else {
            setKeys([]);
        }
        if (result.error) {
            setError(result.error);
        } else {
            setError('');
        }
    };

    return (
        <div className={styles.TraverseTree}>
            <h2>Imprimir árbol</h2>
            <button onClick={handleTraverse}>Imprimir</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default TraverseTree;
