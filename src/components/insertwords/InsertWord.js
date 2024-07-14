// src/components/InsertWord.js
import React, { useState } from 'react';
import { insertWord } from '../../api';
import styles from './InsertWord.module.scss'; // Importa como módulo

const InsertWord = () => {
    const [word, setWord] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const result = await insertWord(word);
            setResponse(result.message || 'Palabra insertada con éxito');
        } catch (err) {
            setError(err.message || 'Error al insertar la palabra');
        }
    };

    return (
        <div className={styles.InsertWord}>
            <h2>Insertar</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Ingresa dato"
                />
                <button type="submit">Insertar</button>
            </form>
            {response && <p>{response}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default InsertWord;
