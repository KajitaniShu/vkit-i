import './App.css';
import {Title} from "./components/Title";
import {ItemList} from "./components/ItemList";
import Sidebar from "./components/Sidebar";
import { DisplayArea} from "./components/DisplayArea";
import React, {useState} from 'react'
import {SelectBox} from './components/SelectBox';

function App() {
  const [itemList, setItemList] = useState([]);

  return (
    <div className="body">
      <div className="editArea">
      <DisplayArea itemList={itemList} setItemList={setItemList}/>
      </div>
    </div>
  );
}

export default App;