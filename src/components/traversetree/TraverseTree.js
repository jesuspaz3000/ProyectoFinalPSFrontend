import React, { useState } from 'react';
import { traverseTree } from '../../api';
import styles from './TraverseTree.module.scss';

const TraverseTree = ({ setTree }) => {
    const [error, setError] = useState('');

    const handleTraverse = async () => {
        const result = await traverseTree();
        if (result.tree) {
            setTree(result.tree);
            setError(''); // Limpiar error si la operación es exitosa
        } else {
            setError(result.error);
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
