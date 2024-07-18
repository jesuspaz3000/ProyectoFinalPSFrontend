import React, { useState, useEffect, useCallback, useMemo } from 'react';
import InitBTree from './components/initbtree/InitBTree';
import InsertWord from './components/insertwords/InsertWord';
import SearchWord from './components/searchwords/SearchWord';
import DeleteWord from './components/deletewords/DeleteWord';
import TraverseTree from './components/traversetree/TraverseTree';
import CanvasTree from './components/canvastree/CanvasTree';
import { getTreeStructure, insertNumber, deleteNumber } from './api';
import styles from './App.module.scss';

function App() {
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [traverseResult, setTraverseResult] = useState([]);

  const fetchTreeStructure = useCallback(async () => {
    try {
      setLoading(true);
      const structure = await getTreeStructure();
      console.log('Estructura del árbol obtenida:', structure);
      setTree(structure.tree || structure);
      setError(null);
    } catch (error) {
      console.error('Error al obtener la estructura del árbol:', error);
      setError('Error al obtener la estructura del árbol');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInit = (newTree) => {
    console.log('Nuevo árbol inicializado:', newTree);
    setTree(newTree);
    setError(null);
  };

  const handleInsert = async (number) => {
    try {
      const result = await insertNumber(number);
      console.log('Resultado de la inserción:', result);
      if (result.tree) {
        setTree(result.tree);
        setError(null);
      } else {
        throw new Error('La inserción no devolvió una estructura de árbol válida');
      }
      return result;
    } catch (error) {
      console.error('Error al insertar número:', error);
      setError(`Error al insertar número: ${error.message}`);
      throw error;
    }
  };

  const handleDelete = async (number) => {
    try {
      const result = await deleteNumber(number);
      console.log('Resultado de la eliminación:', result);
      if (result.tree) {
        setTree(result.tree);
        setError(null);
      } else if (result.message) {
        setError(`Error al eliminar: ${result.message}`);
      } else {
        throw new Error('La eliminación no devolvió una estructura de árbol válida');
      }
      return result;
    } catch (error) {
      console.error('Error al eliminar número:', error);
      setError(`Error al eliminar número: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchTreeStructure();
  }, [fetchTreeStructure]);

  const memoizedTree = useMemo(() => tree, [tree]);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Visualizador de Árbol B</h1>
      </header>
      <div className={styles.controls}>
        <div className={styles.component}>
          <InitBTree onInitialize={handleInit} />
        </div>
        <div className={styles.component}>
          <InsertWord handleInsert={handleInsert} isEnabled={!loading} />
        </div>
        <div className={styles.component}>
          <SearchWord isEnabled={!loading} />
        </div>
        <div className={styles.component}>
          <DeleteWord setTree={handleDelete} isEnabled={!loading} />
        </div>
        <div className={styles.component}>
          <TraverseTree setTraverseResult={setTraverseResult} />
        </div>
      </div>
      {traverseResult.length > 0 && (
        <div className={styles.traverseResult}>Resultado del recorrido: {traverseResult.join(', ')}</div>
      )}
      <main className={styles.AppMain}>
        <div className={styles.visualization}>
          {memoizedTree && <CanvasTree tree={memoizedTree} />}
        </div>
      </main>
      {loading && <p className={styles.loading}>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default App;