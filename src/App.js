// src/App.js
import React from 'react';
import InsertWord from './components/insertwords/InsertWord';
import SearchWord from './components/searchwords/SearchWord';
import DeleteWord from './components/deletewords/DeleteWord';
import TraverseTree from './components/traversetree/TraverseTree';
import CanvasTree from './components/canvastree/CanvasTree';

import styles from './App.module.scss';

function App() {
  return (
    <div>
      <header className={styles.AppHeader}>
        <h1>B Tree</h1>
      </header>
      <main className={styles.AppMain}>
        <div className={styles.component}><InsertWord /></div>
        <div className={styles.component}><SearchWord /></div>
        <div className={styles.component}><DeleteWord /></div>
        <div className={styles.component}><TraverseTree /></div>
      </main>
      <CanvasTree />
    </div>
  );
}

export default App;
