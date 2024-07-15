import React, { useState } from 'react';
import InsertWord from './components/insertwords/InsertWord';
import SearchWord from './components/searchwords/SearchWord';
import DeleteWord from './components/deletewords/DeleteWord';
import TraverseTree from './components/traversetree/TraverseTree';
import InitBTree from './components/initbtree/InitBTree';
import CanvasTree from './components/canvastree/CanvasTree';
import styles from './App.module.scss';

function App() {
  const [tree, setTree] = useState({ degree: 0, keys: [] });

  const updateTree = (newTree) => {
    if (newTree && newTree.tree) {
      setTree(newTree.tree);
    } else if (newTree && newTree.keys) {
      setTree(newTree);
    } else {
      console.error('Unexpected tree structure:', newTree);
    }
  };

  return (
    <div>
      <header className={styles.AppHeader}>
        <h1>B Tree</h1>
      </header>
      <main className={styles.AppMain}>
        <div className={styles.component}><InitBTree setTree={updateTree} /></div>
        <div className={styles.component}><InsertWord setTree={updateTree} /></div>
        <div className={styles.component}><SearchWord setTree={updateTree} /></div>
        <div className={styles.component}><DeleteWord setTree={updateTree} /></div>
        <div className={styles.component}><TraverseTree setTree={updateTree} /></div>
      </main>
      <CanvasTree tree={tree} />
    </div>
  );
}

export default App;