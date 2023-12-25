import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';

import Task from './Task';
import { selectors as tasksSelectors } from '../slices/tasksSlice';

const TaskList = () => {
  const tasks = useSelector(tasksSelectors.selectAll);
  return (
    <Container fluid className="h-100 tasks-list">
      {tasks.map(({ name, id }) => <Task key={id} name={name} id={id} />)}
    </Container>
  );
};

export default TaskList;
