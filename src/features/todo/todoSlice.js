import { createSlice } from "@reduxjs/toolkit";

const initTodos = [
  {
    id: "cc53dc26-61b0-406b-99dd-b8825dd2ceec",
    text: "todo example",
    done: false,
  },
  {
    id: "dd53dc26-b061-6b40-dd99-82b85dd2ce90",
    text: "first todo item",
    done: true,
  },
];

export const todoSlice = createSlice({
  name: "todo",
  initialState: initTodos,
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    addTodos: (state, action) => {
      return action.payload;
    },
    updateTodos:(state, action) => {
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
  },
});

export const { addTodo, deleteTodo, addTodos, updateTodos } = todoSlice.actions;

export default todoSlice.reducer;
