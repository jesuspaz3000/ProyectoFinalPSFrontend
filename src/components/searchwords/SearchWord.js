import React, { useState } from 'react';
import { searchWord } from '../../api';
import styles from './SearchWord.module.scss';

const SearchWord = ({ setTree }) => {
    const [word, setWord] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await searchWord(word);
        if (result.tree) {
            setTree(result.tree);
        }
        setResponse(result.message || result.error);
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
