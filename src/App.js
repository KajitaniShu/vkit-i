import './App.css';
import { DisplayArea} from "./components/DisplayArea";
import React, {useState, useEffect} from 'react'

function App() {

  const [width , setWidth]  = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  function handleResize(){
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  window.addEventListener('resize', handleResize)
  

  return (
    <div className="body">
      <div className="editArea" style = {{width:width, height:height}}>
      <DisplayArea/>
      </div>
    </div>
  );
}

export default App;