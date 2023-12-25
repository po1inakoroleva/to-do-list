import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const tasksAdapter = createEntityAdapter();
const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    setTasks: tasksAdapter.addMany,
    removeTask: (state, { payload }) => {
      tasksAdapter.removeOne(state, payload);
    },
    renameTask: (state, { payload }) => {
      const task = Object.values(state.entities).find((t) => t.id === payload.id);
      task.name = payload.name;
    },
  },
});

const selectors = tasksAdapter.getSelectors((state) => state.tasks);
const { actions } = tasksSlice;
export { actions, selectors };
export default tasksSlice.reducer;
