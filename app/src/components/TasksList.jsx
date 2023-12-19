import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';

import Task from './Task';
import { selectors as tasksSelectors } from '../slices/tasksSlice';

const TaskList = () => {
  const tasks = useSelector(tasksSelectors.selectAll);
  return (
    <Container fluid className="h-100 tasksList">
      {tasks.map(({ name }) => <Task taskName={name} />)}
    </Container>
  );
};

export default TaskList;
