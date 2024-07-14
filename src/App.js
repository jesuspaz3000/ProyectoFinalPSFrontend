// src/App.js
import React, { useState } from 'react';
import InsertWord from './components/insertwords/InsertWord';
import SearchWord from './components/searchwords/SearchWord';
import DeleteWord from './components/deletewords/DeleteWord';
import TraverseTree from './components/traversetree/TraverseTree';
import InitBTree from './components/initbtree/InitBTree';
import CanvasTree from './components/canvastree/CanvasTree';
import styles from './App.module.scss';

function App() {
  const [keys, setKeys] = useState([]);
  const [degree, setDegree] = useState(null);

  return (
    <div>
      <header className={styles.AppHeader}>
        <h1>B Tree</h1>
      </header>
      <main className={styles.AppMain}>
        <div className={styles.component}><InitBTree setDegree={setDegree} /></div>
        {degree && (
          <>
            <div className={styles.component}><InsertWord /></div>
            <div className={styles.component}><SearchWord /></div>
            <div className={styles.component}><DeleteWord /></div>
            <div className={styles.component}>
              <TraverseTree setKeys={setKeys} />
            </div>
          </>
        )}
      </main>
      <CanvasTree keys={keys} />
    </div>
  );
}

export default App;
