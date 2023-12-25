import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import TaskForm from './Form';
import TaskList from './TasksList';
import { actions as tasksActions, selectors } from '../slices/tasksSlice';

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectors.selectAll);
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      dispatch(tasksActions.setTasks(storedTasks));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <TaskForm />
      <TaskList />
    </>
  );
};

export default App;
