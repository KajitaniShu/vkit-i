import './App.css';
import { DisplayArea} from "./components/DisplayArea";
import React, {useState} from 'react'

function App() {

  return (
    <div className="body">
      <div className="editArea">
      <DisplayArea/>
      </div>
    </div>
  );
}

export default App;