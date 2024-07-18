import React, { useState, useRef, useCallback } from 'react';
import styles from './InsertWord.module.scss';

const InsertWord = ({ handleInsert, isEnabled }) => {
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setMessage('');
        if (number && isEnabled) {
            const parsedNumber = parseInt(number, 10);
            if (isNaN(parsedNumber)) {
                setMessage('Por favor, ingrese un número válido');
                return;
            }
            try {
                console.log('Attempting to insert number:', parsedNumber);
                const result = await handleInsert(parsedNumber);
                console.log('Insert result:', result);
                
                if (result.tree) {
                    console.log('New tree structure:', result.tree);
                    setMessage('Inserción exitosa');
                } else {
                    console.error('Insert result does not contain tree structure');
                    setMessage('Error: Estructura del árbol no recibida');
                }
                setNumber('');
                setTimeout(() => inputRef.current.blur(), 100); // Desenfocar el input después de un breve retraso
            } catch (error) {
                console.error('Error inserting number:', error);
                setMessage('Error al insertar: ' + error.message);
                setTimeout(() => inputRef.current.blur(), 100); // Desenfocar el input después de un breve retraso
            }
        }
    }, [number, isEnabled, handleInsert]);

    const handleChange = useCallback((e) => {
        setNumber(e.target.value);
    }, []);

    return (
        <div className={styles.InsertWord}>
            <h2>Insertar Número</h2>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="number"
                    value={number}
                    onChange={handleChange}
                    placeholder="Ingresa número"
                    disabled={!isEnabled}
                />
                <button type="submit" disabled={!isEnabled}>Insertar</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default InsertWord;
