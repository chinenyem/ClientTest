import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTaskGroups, getTasks, saveTask, deleteTask, TaskDetailsModel, TaskGroupModel } from "../proxies/task.proxy";

export const $getTasks = createAsyncThunk("thunk-get-tasks", getTasks);
export const $getTaskGroups = createAsyncThunk("thunk-get-task-groups", getTaskGroups);
export const $saveTask = createAsyncThunk("thunk-add-task", saveTask);
export const $deleteTask = createAsyncThunk("thunk-delete-task", deleteTask);



export const taskingSlice = createSlice({
  name: "user",
  initialState: {
    activeTasks: new Array<TaskDetailsModel>(),
    taskGroups: new Array<TaskGroupModel>()
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase($getTasks.fulfilled, (state, action) => {
      state.activeTasks = action.payload;
    });
    builder.addCase($getTaskGroups.fulfilled, (state, action) => {
      state.taskGroups = action.payload;
    });
    builder.addCase($saveTask.fulfilled, (state, action) => {
      state.activeTasks.push(action.payload);
    });
    builder.addCase($deleteTask.fulfilled, (state, action) => {
      state.activeTasks = state.activeTasks.filter((task) => task.id !== action.payload && task.createdAt !== "");
    });
  },
});
export default taskingSlice.reducer;
