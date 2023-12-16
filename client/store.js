import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import ToDoSlice from './features/toDo/ToDoSlice';

const store = configureStore({
  reducer: {
    toDo: ToDoSlice,
  },
});
export const AppDispatch = store.dispatch;
export const useAppDispatch = useDispatch;

export const RootState = store.getState;
export default store;
