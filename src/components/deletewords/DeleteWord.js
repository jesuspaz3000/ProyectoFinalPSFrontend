// src/components/DeleteWord.js
import React, { useState } from 'react';
import { deleteWord } from '../../api';
import styles from './DeleteWord.module.scss'

const DeleteWord = () => {
    const [word, setWord] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await deleteWord(word);
        setResponse(result.message || result.error);
    };

    return (
        <div className={styles.DeleteWord}>
            <h2>Eliminar</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Ingresa dato"
                />
                <button type="submit">Eliminar</button>
            </form>
            <p>{response}</p>
        </div>
    );
};

export default DeleteWord;
