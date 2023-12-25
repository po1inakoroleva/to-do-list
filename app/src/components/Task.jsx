import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { actions as tasksActions } from '../slices/tasksSlice';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <buttom
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </buttom>
));

const Task = ({ name, id }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const validationSchema = Yup.object().shape({
    newTask: Yup.string().required().trim().max(100, 'The maximum length is 100 characters'),
  });

  const formik = useFormik({
    initialValues: {
      newTask: name,
    },
    validationSchema,
    onSubmit: ({ newTask }) => {
      dispatch(tasksActions.renameTask({ name: newTask, id }));
      formik.resetForm();
      setEditing(false);
    },
  });

  const handleRemove = (taskId) => () => {
    dispatch(tasksActions.removeTask(taskId));
  };

  const handleRename = () => {
    setEditing(true);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="py-2 px-3 text-bg-white task">
        <Dropdown variant="outline-white">
          {!editing ? (
            <>
              <Dropdown.Toggle as={CustomToggle}>
                <svg
                  width="34px"
                  height="34px"
                  viewBox="0 0 1024.00 1024.00"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="0.01024"
                  transform="rotate(-45)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g
                    d="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="12.288"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M450.72 418.17c-42.29-21.86-144.5-220-171.65-198.22s-40.59 114.28 0.29 171.31 132 97 153.52 129.58 18.45 57.07 13.36 63.2S262.49 462 217.66 485.53s-28.41 84.69 17.56 132.54S427 651.39 455.57 672.76s32.72 55 20.49 55-145.88-32.38-192.77-24.15-68.25 39.89 0.12 73.42 180.26 8.87 199.28 28.21 6.8 28.54-7.47 29.58-110.14-4.91-143.78 0.24 6.21 56.07 23.57 69.3 80.59 19.24 98.94 16.15 36.67-26.58 51-20.48 3.14 45.88 8.25 53 46.92 9.1 53-0.09-10.26-37.71-0.09-51 32.65 11.16 66.28-1.13 109-70.55 111-104.2-132.52 27.76-167.19 26.8c-24.48-4-34.71-21.36-19.43-30.56s228.33-55.45 244.57-96.27 4-34.68-21.47-34.63S605.6 724.45 590.26 700 791 610 813.3 555.9s29.37-119.36-0.22-127.47-147.62 137.92-194.54 130.86-1.06-21.41 19.29-48 132.36-120.51 133.32-154.16 10.08-67.32-27.65-71.33-129.27 135.84-149.69 123.63 52.89-78.61 64-143.89S632.09 133 611.7 137.14s-19.37 4.11-19.34 22.47 10.33 79.52-1.85 114.21-13.14 60.18-23.35 54.08-10.27-43.83-4.2-73.41 23.3-92.83 13.07-112.19S545.27 48.53 467.8 68s-72.25 89.86-65 136.75 27.67 83.57 45.09 128.41 21.71 94.77 2.83 85.01z"
                      fill="#7ec2c4"
                    />
                  </g>
                </svg>
              </Dropdown.Toggle>
              {name}
            </>
          ) : (
            <Form onSubmit={formik.handleSubmit} className="border rounded-2">
              <InputGroup>
                <Form.Control
                  type="text"
                  value={formik.values.newTask}
                  placeholder="Task"
                  name="newTask"
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
                  <svg
                    fill="#000000"
                    width="20"
                    height="20"
                    viewBox="0 0 24.00 24.00"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000"
                    strokeWidth="0.00024000000000000003"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="0.384"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M5.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,5.5 C3,4.11928813 4.11928813,3 5.5,3 Z M5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L5.5,4 Z M15.1464466,9.14644661 C15.3417088,8.95118446 15.6582912,8.95118446 15.8535534,9.14644661 C16.0488155,9.34170876 16.0488155,9.65829124 15.8535534,9.85355339 L10.8535534,14.8535534 C10.6582912,15.0488155 10.3417088,15.0488155 10.1464466,14.8535534 L8.14644661,12.8535534 C7.95118446,12.6582912 7.95118446,12.3417088 8.14644661,12.1464466 C8.34170876,11.9511845 8.65829124,11.9511845 8.85355339,12.1464466 L10.5,13.7928932 L15.1464466,9.14644661 Z"
                      />
                    </g>
                    <span className="visually-hidden">Ok</span>
                  </svg>
                </button>
                <Form.Control.Feedback type="invalid" tooltip>{formik.errors.newTask}</Form.Control.Feedback>
              </InputGroup>
              {formik.errors.newTask ? <div className="invalid-feedback">{formik.errors.newTask}</div> : null}
            </Form>
          )}
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove(id)}>Complete task</Dropdown.Item>
            <Dropdown.Item onClick={handleRename}>Edit task</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Task;
