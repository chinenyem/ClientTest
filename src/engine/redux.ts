import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import taskingSlice from './slices/tasking.slice';
import userSlice from './slices/user.slice'
import  airqualitySlice  from "./slices/airquality.slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    tasking: taskingSlice,
    measurement: airqualitySlice
  }
});
export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const mapProps: TypedUseSelectorHook<RootState> = useSelector
export const mapDispatch: () => RootDispatch = useDispatch;
export default store;
