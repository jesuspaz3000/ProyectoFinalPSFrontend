// src/components/InsertWord.js
import React, { useState } from 'react';
import { insertWord } from '../../api';
import styles from './InsertWord.module.scss'; // Importa como módulo

const InsertWord = () => {
    const [word, setWord] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await insertWord(word);
        setResponse(result.message || result.error);
    };

    return (
        <div className={styles.InsertWord}> {/* Asegúrate de usar la clase aquí */}
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
            <p>{response}</p>
        </div>
    );
};

export default InsertWord;
