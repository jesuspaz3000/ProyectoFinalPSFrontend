import React, { useState, useRef, useCallback } from 'react';
import styles from './DeleteWord.module.scss';

const DeleteWord = ({ setTree, isEnabled }) => {
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setMessage('');
        if (number && isEnabled) {
            try {
                const result = await setTree(parseInt(number, 10));
                if (result.message) {
                    setMessage(result.message);
                } else {
                    setMessage('Eliminación exitosa');
                }
                setNumber('');
                setTimeout(() => inputRef.current.blur(), 100); // Desenfocar el input después de un breve retraso
            } catch (error) {
                console.error('Error al eliminar número:', error);
                setMessage('Error al eliminar: ' + error.message);
                setTimeout(() => inputRef.current.blur(), 100); // Desenfocar el input después de un breve retraso
            }
        }
    }, [number, isEnabled, setTree]);

    const handleChange = useCallback((e) => {
        setNumber(e.target.value);
    }, []);

    return (
        <div className={styles.DeleteWord}>
            <h2>Eliminar Número</h2>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="number"
                    value={number}
                    onChange={handleChange}
                    placeholder="Ingresa número"
                    disabled={!isEnabled}
                />
                <button type="submit" disabled={!isEnabled}>Eliminar</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default DeleteWord;
