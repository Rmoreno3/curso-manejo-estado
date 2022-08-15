import React from 'react';
import { UseState } from './UseState';
import { ClassState } from './ClassState';
import { UseReducer } from './UseReducer';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <ClassState name="ClassSTate" />
      <UseReducer name="UseReducer" />
    </div>
  );
}

export default App;
