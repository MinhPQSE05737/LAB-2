// App.js
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, toggle, remove, removeCompleted, removeAll, edit, all, done, todo } from './todoSlice';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');
  const todos = useSelector(state => state);
  const [newTodo, setNewTodo] = React.useState('');
  const [editingId, setEditingId] = React.useState(null);
  const [editingText, setEditingText] = React.useState('');

  const handleAdd = () => {
    dispatch(add(newTodo));
    setNewTodo('');
  };

  const handleEdit = (id, text) => {
    dispatch(edit({ id, text }));
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="App">
      <h1>Todo Input</h1>
      <div className="add-task-container">
        <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
        <button onClick={handleAdd}>Add new task</button>
      </div>
      <h1>Todo LIST</h1>
      <div className="button-group">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Done')}>Done</button>
        <button onClick={() => setFilter('Todo')}>Todo</button>
      </div>
     
      {todos .filter(todo => {
        switch(filter) {
          case 'All': return true;
          case 'Done': return todo.completed;
          case 'Todo': return !todo.completed;
          default: return true;
        }
      }).map(todo => (
          <div key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <input 
                value={editingText}
                onChange={e => setEditingText(e.target.value)}
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <div>
              <button style={{backgroundColor: 'transparent'}} onClick={() => dispatch(toggle(todo.id))}>
                {todo.completed ? '✅' : '⬜'}
              </button>
              {editingId === todo.id ? (
                <button style={{backgroundColor: 'transparent'}} onClick={() => handleEdit(todo.id, editingText)}>Save</button>
              ) : (
                <button style={{backgroundColor: 'transparent'}} onClick={() => {
                  setEditingId(todo.id);
                  setEditingText(todo.text);
                }}>
                  ✏️
                </button>
              )}
              <button style={{backgroundColor: 'transparent'}} onClick={() => dispatch(remove(todo.id))}>🗑</button>
            </div>
          </div>
      ))}

      <div className="button-group">
        <button className='delete' style={{backgroundColor: 'red', color: 'white'}} onClick={() => dispatch(removeCompleted())}>Delete Done task</button>
        <button className='delete' style={{backgroundColor: 'red', color: 'white'}}onClick={() => dispatch(removeAll())}>Delete all task</button>
      </div>
    </div>
  );
}
