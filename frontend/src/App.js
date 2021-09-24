import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [items, setItems] = useState({
    title: '',
    description: 'etst',
    completed: false,
  });
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/todos/')
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);

  const refreshTodo = () => {
    axios
      .get('http://127.0.0.1:8000/api/todos/')
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addItem = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/todos/', items)
      .then((res) => {
        console.log(res.data);
        refreshTodo();
        setItems({ title: '', description: 'etst', completed: false });
      })
      .catch((err) => console.log(err));
  };


  const deleteItem = (e, id) => {
    e.preventDefault();
    console.log(id);
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`).then((res) => {
      console.log(res.data);
      refreshTodo();
    });
  };

  function Todo(props) {
    return (
      <div>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {props.title}
          <span
            className="badge badge-primary badge-pill"
            onClick={(e) => deleteItem(e, props.id)}
          >
            delete
          </span>
        </li>
      </div>
    );
  }

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="App">
      <h5> Simple Todo </h5>
      <ul className="list-group">
        {todos.map((todo, index) => (
          <Todo
            id={todo.id}
            title={todo.title}
            description={todo.description}
            refreshTodo={refreshTodo}
            key={todo.id}
          />
        ))}
      </ul>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add Todo"
          value={items.title}
          onChange={(e) =>
            setItems({
              title: e.target.value,
              description: 'etst',
              completed: false,
            })
          }
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={(e) => addItem(e)}
          >
            {' '}
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
