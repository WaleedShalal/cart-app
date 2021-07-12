import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginLogged, loginData } from '../../redux/login/loginActions';

const Logout = () => {
  const { loginInfo } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleReplace = () => {
      history.replace('/home');
    };
    handleReplace();
    dispatch(loginData());
    dispatch(loginLogged(true));
    let user = '';
    let pass = '';
    dispatch(loginData());
    localStorage.setItem('username', JSON.stringify(user));
    localStorage.setItem('password', JSON.stringify(pass));
  };

  return (
    <React.Fragment>
      <h1>Logout Form </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='User'>Username</label>
          <input
            type='text'
            name='username'
            id='User'
            value={loginInfo.userData.username}
            onChange={() => loginInfo.userData.username}
            autoComplete='off'
            spellCheck='false'
            autoCorrect='off'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Password'>Password</label>
          <input
            type='password'
            name='password'
            id='Password'
            value={loginInfo.userData.password}
            onChange={() => loginInfo.userData.username}
            className='form-control'
          />
        </div>
        <button
          type='button'
          ref={buttonRef}
          onClick={handleSubmit}
          className='btn btn-primary'>
          Log out
        </button>
      </form>
    </React.Fragment>
  );
};

export default Logout;
