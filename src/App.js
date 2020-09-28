import React from 'react';
import Layout from './layout/index'
import './App.css';
import CONST from './const.js'
function App() {
  return (
    <div className="App">
      <Layout state={ CONST.NOONE }/>
    </div>
  );
}

export default App;
