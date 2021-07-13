import React, { useState, useEffect, useRef } from 'react';
import Joi from 'joi-browser';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginLogged,
  loginData,
  loginErrors,
} from '../../redux/login/loginActions';

const Login = () => {
  const { loginInfo } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [values, setValues] = useState({ username: '', password: '' });
  const history = useHistory();
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const schema = {
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(3).max(10).required(),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors) return;
    const handleReplace = () => {
      history.replace('/home');
    };
    handleReplace();
    dispatch(loginLogged(true));
    let data = { ...values };
    let user = data.username.toLowerCase();
    let pass = data.password;
    dispatch(loginData(user, pass));
    localStorage.setItem('username', JSON.stringify(user));
    localStorage.setItem('password', JSON.stringify(pass));
  };

  const validate = () => {
    const errors = {};
    const res = Joi.validate(values, schema, { abortEarly: false });
    if (res.error === null) {
      dispatch(loginErrors({}));
      return false;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    dispatch(loginErrors(errors));
    return errors;
  };

  return (
    <React.Fragment>
      <h1>Login Form </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='User'>Username</label>
          <input
            type='text'
            name='username'
            id='User'
            ref={userRef}
            onChange={handleChange}
            value={values.username}
            autoComplete='off'
            spellCheck='false'
            autoCorrect='off'
            className='form-control'
          />
          {loginInfo.errors.username && (
            <div className='alert alert-danger'>
              {loginInfo.errors.username}
            </div>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='Password'>Password</label>
          <input
            type='password'
            name='password'
            id='Password'
            onChange={handleChange}
            value={values.password}
            className='form-control'
          />
          {loginInfo.errors.password && (
            <div className='alert alert-danger'>
              {loginInfo.errors.password}
            </div>
          )}
        </div>
        <button
          type='button'
          onClick={handleSubmit}
          className='btn btn-primary'>
          Log in
        </button>
      </form>
    </React.Fragment>
  );
};

export default Login;
