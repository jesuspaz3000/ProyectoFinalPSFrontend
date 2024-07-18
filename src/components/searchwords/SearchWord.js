import React, { useState, useRef } from 'react';
import { searchNumber } from '../../api';
import styles from './SearchWord.module.scss';

const SearchWord = ({ isEnabled }) => {
    const [number, setNumber] = useState('');
    const [response, setResponse] = useState('');
    const inputRef = useRef(null); // Crear referencia para el input

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEnabled) {
            try {
                const result = await searchNumber(parseInt(number, 10));
                setResponse(result.message || result.error);
                setNumber(''); // Limpiar el input después de la búsqueda
                inputRef.current.blur(); // Desenfocar el input
            } catch (error) {
                setResponse('Error al buscar: ' + error.message);
                setNumber(''); // Limpiar el input en caso de error
                inputRef.current.blur(); // Desenfocar el input
            }
        }
    };

    return (
        <div className={styles.SearchWord}>
            <h2>Buscar</h2>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef} // Asignar la referencia al input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Ingresa número"
                    disabled={!isEnabled}
                />
                <button type="submit" disabled={!isEnabled}>Buscar</button>
            </form>
            <p>{response}</p>
        </div>
    );
};

export default SearchWord;
