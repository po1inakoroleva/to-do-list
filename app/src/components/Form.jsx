import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

import { actions as tasksActions } from '../slices/tasksSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    task: Yup.string().required().max(100, 'Максимум 100 знаков'),
  });

  const formik = useFormik({
    initialValues: {
      task: '',
    },
    validationSchema,
    onSubmit: ({ task }) => {
      const id = uniqueId();
      dispatch(tasksActions.addTask({ name: task, id }));
      formik.resetForm();
    },
  });

  return (
    <Container fluid className="h-100 formContainer">
      <h1>What are you going to do today?</h1>
      <Row className="justify-content-center align-content-center h-100">
        <Form onSubmit={formik.handleSubmit} className=" col-md-6 py-1 border rounded-2">
          <InputGroup>
            <Form.Control
              type="text"
              value={formik.values.task}
              placeholder="New task"
              name="task"
              onChange={formik.handleChange}
              required
              autoFocus
              disabled={formik.isSubmitting}
            />
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn btn-group-vertical"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
                <span className="visually-hidden">Add</span>
              </svg>
            </button>
          </InputGroup>
          <Form.Control.Feedback type="invalid" tooltip>{formik.errors.task}</Form.Control.Feedback>
        </Form>
      </Row>
    </Container>
  );
};

export default TaskForm;
