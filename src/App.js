import './App.css';
import { DisplayArea} from "./components/DisplayArea";
import React, {useState} from 'react'

function App() {

  return (
    <div className="body">
      <div className="editArea" style = {{width:window.innerWidth, height:window.innerHeight}}>
      <DisplayArea/>
      </div>
    </div>
  );
}

export default App;