import './App.css';
import { DisplayArea} from "./components/DisplayArea";
import React, {useState} from 'react'

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