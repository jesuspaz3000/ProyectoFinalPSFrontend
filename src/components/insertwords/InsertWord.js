import React, { useState } from 'react';
import { insertWord } from '../../api';
import styles from './InsertWord.module.scss';

const InsertWord = ({ setTree }) => {
    const [word, setWord] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await insertWord(word);
        if (result.tree) {
            setTree(result);  // Pasar todo el objeto result
        }
        setMessage(result.message || result.error || 'Word inserted successfully');
    };

    return (
        <div className={styles.InsertWord}>
            <h2>Insertar Palabra</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Ingresa palabra"
                />
                <button type="submit">Insertar</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default InsertWord;