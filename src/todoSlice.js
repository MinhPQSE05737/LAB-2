import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggle: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    remove: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    edit: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    removeCompleted: (state) => {
      return state.filter(todo => !todo.completed);
    },
    all:  (state) => {
        return state.filter(todo => todo);
    },
    done:  (state) => {
        return state.filter(todo => todo.completed);
    },
    todo: (state) => {
        return state.filter(todo => !todo.completed);
    },
    removeAll: () => [],
  },
})

export const { add, toggle, remove, edit, removeCompleted, removeAll,all, todo, done } = todoSlice.actions

export default todoSlice.reducer;
