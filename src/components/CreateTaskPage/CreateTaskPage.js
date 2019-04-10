import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import InlineError from '../InlineError';
import { validateForm } from '../../helpers';
import { createTask } from '../../AC';

const CreateTaskPage = (props) => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ text: '', username: '', email: '' });
  const [message, setMessage] = useState('');

  const onChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { validationErrors, noErrors } = validateForm(data);
    setErrors(validationErrors);
    if (!noErrors) return;

    props.createTask(data);
    setMessage('New task has added');
  };
  return (
    <Form className="create-task__form" onSubmit={e => onSubmit(e)}>
      <Form.TextArea
        error={!!errors.text}
        required
        label="Text"
        control="input"
        name="text"
        onChange={onChangeInput}
        value={data.text}
      />
      {errors.text && <InlineError text={errors.text} />}
      <Form.Group>
        <Form.Field
          className=""
          error={!!errors.username}
          required
          label="Username"
          control="input"
          name="username"
          onChange={onChangeInput}
          value={data.username}
        />
        {errors.username && <InlineError text={errors.username} />}
        <Form.Field
          className=""
          error={!!errors.email}
          required
          label="E-mail"
          control="input"
          name="email"
          onChange={onChangeInput}
          value={data.email}
        />
        {errors.email && <InlineError text={errors.email} />}
      </Form.Group>
      <Button inverted color="blue" type="submit" className="btn">
        {' '}
        Add new task{' '}
      </Button>
      {message && (
        <div style={{ color: 'green' }}>
          <p>{message}</p>{' '}
        </div>
      )}
    </Form>
  );
};

export default connect(
  null,
  { createTask }
)(CreateTaskPage);
