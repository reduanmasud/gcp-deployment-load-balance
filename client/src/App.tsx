import React, { useEffect, useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

function App() {
  const [datas, setDatas] = useState<Todo[]>([]);

  const fetchLists = () => {
    fetch("http://localhost:3000/api/todos")
      .then(res => res.json())
      .then((data: Todo[]) => setDatas(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleAdd = () => {
    const dataText = document.querySelector("#data_text") as HTMLInputElement;

    if (dataText.value === "") {
      alert('Input Field Can not be empty');
      return;
    }

    const newData: Todo = {
      id: datas.length + 1, // Replace with actual logic to generate IDs
      task: dataText.value,
      completed: false
    };

    const reqData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    };

    fetch("http://localhost:3000/api/todos", reqData)
      .then(res => res.json())
      .then((data: Todo) => setDatas(prevDatas => [...prevDatas, data]))
      .then(() => (dataText.value = ""))
      .catch(error => console.error('Error adding data:', error));
  };

  const handleUpdate = (id: number) => {
    const reqData = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true })
    };

    fetch(`http://localhost:3000/api/todos/${id}`, reqData)
      .then(res => res.json())
      .then(() => fetchLists())
      .catch(error => console.error('Error updating data:', error));
  };

  const handleDelete = (id: number) => {
    const reqData = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`http://localhost:3000/api/todos/${id}`, reqData)
      .then(() => fetchLists())
      .catch(error => console.error('Error deleting data:', error));
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 create_todo input-group mb-3 " >
          <input type="text" id="data_text" style={{ width: "500px" }} className='form-group' />
          <button onClick={handleAdd} className='btn btn-success'>Add</button>
        </div>
      </div>
      <div className="view_todo">
        {datas.map((data) => (
          <div className="input-group mb-3" key={data.id}>
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={data.completed}
                onClick={() => handleUpdate(data.id)}
                value=""
                aria-label="Checkbox for following text input"
              />
            </div>
            <input
              type="text"
              value={data.task}
              className={`form-control ${data.completed ? "disabled" : "bg-info"}`}
              disabled={data.completed}
              aria-label="Text input with checkbox"
            />
            <button type="button" className='btn btn-success' onClick={() => handleDelete(data.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
