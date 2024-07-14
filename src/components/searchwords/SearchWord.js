import React, { useState } from 'react';
import { searchWord } from '../../api';
import styles from './SearchWord.module.scss';

const SearchWord = () => {
    const [word, setWord] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await searchWord(word);
        if (result.found) {
            setResponse(`Found: ${word}`);
        } else {
            setResponse(`Not Found: ${word}`);
        }
    };

    return (
        <div className={styles.SearchWord}>
            <h2>Buscar</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Ingresa dato"
                />
                <button type="submit">Buscar</button>
            </form>
            <p>{response}</p>
        </div>
    );
};

export default SearchWord;
