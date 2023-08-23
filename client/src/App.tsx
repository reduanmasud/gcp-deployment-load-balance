import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [datas, setDatas] = useState([]);
  const fetchLists = () => {
    fetch("http://localhost:3000/api/todos")
    .then(res => {
      console.log(res);
      return res.json();
    }).then((data) => setDatas(data));
  }

  useEffect(() => {
    fetchLists()
  }, [])
  console.log(datas);

  
  const handleAdd = () => {
    const dataText = document.querySelector("#data_text") as HTMLInputElement;

    if (dataText.value === "") {
      alert('Input Field Can not be empty');
      return;
    }

    const newData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task:dataText.value, completed:false })
    }

    fetch("http://localhost:3000/api/todos", newData)
      .then(res => res.json())
      .then(data => setDatas((prevDatas) => [...prevDatas, data]))
      .then(() => (dataText.value = ""));
    
    };

    const handleUpdate = (id: number) => {
      const reqData = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  completed:true })
      }

      fetch(`http://localhost:3000/api/todos/${id}`, reqData)
      .then(res => res.json())
      .then(() => fetchLists());

    }


    const handleDelete = (id: number) => {
      const reqData = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }

      fetch(`http://localhost:3000/api/todos/${id}`, reqData)
      .then(res => res.json())
      .then(() => fetchLists());

    }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 create_todo input-group mb-3 " >
          <input type="text" id="data_text" style={{width:"500px"}} className='form-group'/>
          <button onClick={handleAdd} className='btn btn-success'>Add</button>
        </div>
      </div>
      <div className="view_todo">
        
      {datas.map((data, idx) => (
        <>
        <div className="input-group mb-3">
          <div className="input-group-text">

            {data.completed ? <input className="form-check-input mt-0 disabled" disabled checked type="checkbox" value="" aria-label="Checkbox for following text input" /> : <input className="form-check-input mt-0" type="checkbox" onClick={() => handleUpdate(data.id)} value="" aria-label="Checkbox for following text input" />}
          </div>
          {data.completed ? <input type="text" value={data.task} className="form-control disabled" disabled aria-label="Text input with checkbox" /> : <input type="text" value={data.task} className="form-control disabled bg-info" disabled aria-label="Text input with checkbox" />}
          
          <button type="button" className='btn btn-success' onClick={() => handleDelete(data.id)}>Delete</button>
        </div>
        </>
      ))}
        
      </div>
    </>
  );
}

export default App;
