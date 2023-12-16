/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';

const initialState = {
  ToDoList: [],
  ToDo: null,
};

export const updateToDo = createAsyncThunk('toDo/update', (toDoUpdate) => {
  return api.fetchUpdateToDo(toDoUpdate);
});

export const loadToDos = createAsyncThunk('baristas/load', () => api.fetchLoadToDos());

export const saveToDo = createAsyncThunk('barista/freeDate/save', (newToDo) =>
  api.fetchSaveToDo(newToDo)
);

export const deleteToDo = createAsyncThunk(
  'coffeeShop/favorite/remove',
  (id) => api.fetchDeleteToDo(id)
);

const ToDoSlice = createSlice({
  name: 'toDos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateToDo.fulfilled, (state, action) => {
      state.ToDo = action.payload;
    });
    builder.addCase(loadToDos.fulfilled, (state, action) => {
      state.ToDoList = action.payload;
    });
    builder.addCase(saveToDo.fulfilled, (state, action) => {
      state.ToDoList.push(action.payload);
    });
    builder.addCase(deleteToDo.fulfilled, (state, action) => {
      state.ToDoList = state.ToDoList.filter((toDo) => toDo.id !== +action.payload);
    });
  },
});
export default ToDoSlice.reducer;
