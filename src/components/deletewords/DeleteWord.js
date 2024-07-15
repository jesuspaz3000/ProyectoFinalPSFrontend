import React, { useState } from 'react';
import { deleteWord } from '../../api';
import styles from './DeleteWord.module.scss';

const DeleteWord = ({ setTree }) => {
    const [word, setWord] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await deleteWord(word);
        if (result.tree) {
            setTree(result.tree);
        }
        setMessage(result.message || result.error);
    };

    return (
        <div className={styles.DeleteWord}>
            <h2>Eliminar Palabra</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Ingresa palabra"
                />
                <button type="submit">Eliminar</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default DeleteWord;
