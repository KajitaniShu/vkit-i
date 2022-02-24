import './App.css';
import {Title} from "./components/Title";
import {ItemList} from "./components/ItemList";
import Sidebar from "./components/Sidebar";
import { DisplayArea} from "./components/DisplayArea";
import React, {useState, useEffect} from 'react'
import {SelectBox} from './components/SelectBox';

function App() {
  const [itemList, setItemList] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() =>{
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  },[])

  return (
    <div className="body">
      <div className="editArea">
      <Sidebar />
      <div className="displayArea" ><DisplayArea itemList={itemList} setItemList={setItemList}/></div>
      <div className="itemListArea">
        <Title message={message}/>
        <SelectBox itemList={itemList} setItemList={setItemList}/>
        <ItemList itemList={itemList} setItemList={setItemList}/>
      </div>
      </div>
    </div>
  );
}

export default App;