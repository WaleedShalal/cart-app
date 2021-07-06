import React, { useEffect, useRef } from 'react';
import Joi from 'joi-browser';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
	const { values, setErrors, setValues, errors, setLogged, setUserData } =
		props;
	const history = useHistory();
	const userRef = useRef();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	const schema = {
		username: Joi.string().min(3).max(10).required(),
		password: Joi.string().min(3).max(10).required(),
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validate();
		if (errors) return;
		const handleReplace = () => {
			history.replace('/home');
		};
		handleReplace();
		setLogged(true);
		let data = { ...values };
		let user = data.username;
		let pass = data.password;
		// data = values.username;
		setUserData(data);
		localStorage.setItem('username', JSON.stringify(user));
		localStorage.setItem('password', JSON.stringify(pass));
	};

	const validate = () => {
		const errors = {};
		const res = Joi.validate(values, schema, { abortEarly: false });
		if (res.error === null) {
			setErrors({});
			return false;
		}
		for (const error of res.error.details) {
			errors[error.path] = error.message;
		}
		setErrors(errors);
		return errors;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
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
					{errors.username && (
						<div className='alert alert-danger'>{errors.username}</div>
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
					{errors.password && (
						<div className='alert alert-danger'>{errors.password}</div>
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
