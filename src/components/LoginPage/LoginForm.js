import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InlineError from '../InlineError';
import { login } from '../../AC';
import { validateForm } from '../../helpers';

const LoginForm = (props) => {
  const [data, setData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const { validationErrors, noErrors } = validateForm(data);
    setErrors(validationErrors);
    if (!noErrors) return;
    props.login(data);
    props.history.push('/');
  };

  return (
    <Form onSubmit={e => onSubmit(e)}>
      <Form.Field error={!!errors.username}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={data.username}
            onChange={onChange}
          />
        </label>
        {errors.username && <InlineError text={errors.username} />}
      </Form.Field>
      <Form.Field error={!!errors.password}>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChange}
          />
        </label>
        {errors.password && <InlineError text={errors.password} />}
      </Form.Field>
      <Button inverted color="blue" className="btn">
        Log in
      </Button>
    </Form>
  );
};

export default connect(
  ({ user }) => ({ user }),
  { login }
)(withRouter(LoginForm));
