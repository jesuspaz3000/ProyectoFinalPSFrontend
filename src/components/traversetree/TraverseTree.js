import React, { useState } from 'react';
import { traverseTree } from '../../api';
import styles from './TraverseTree.module.scss';

const TraverseTree = ({ setTraverseResult }) => {
    const [error, setError] = useState('');

    const handleTraverse = async () => {
        try {
            const result = await traverseTree();
            if (result.traverse) {
                setTraverseResult(result.traverse);
                setError(''); // Limpiar error si la operación es exitosa
            } else {
                setError('Error: Traverse result is empty.');
            }
        } catch (error) {
            setError('Error: ' + error.message);
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
