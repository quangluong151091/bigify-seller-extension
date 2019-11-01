/* global chrome */

import React from 'react';
import './App.css';
import SettingForm from "./components/Form/setting-form";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Bigify Seller Extension</h3>
      </header>

      <SettingForm />
    </div>
  );
}

export default App;
