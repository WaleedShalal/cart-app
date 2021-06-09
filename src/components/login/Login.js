import React, { Component } from 'react';
import Joi from 'joi-browser';
import axios from 'axios';

class Login extends Component {
	state = {
		username: '',
		password: '',
		errors: {},
	};

	username = React.createRef();

	componentDidMount() {
		this.username.current.focus();
	}

	schema = {
		username: Joi.string().required(),
		password: Joi.string().required(),
	};

	handleSubmit = async (e) => {
		// e.preventDefault();
		// const username = this.username.current.value;
		// console.log(username);
		const errors = this.validate();
		console.log(errors);
		if (errors) return;
		//Call Backend
		const obj = { ...this.state };
		delete obj.password;
		delete obj.errors;
		await axios.patch('http://localhost:3000/user/', obj);
		console.log('Submitted');
	};

	validate = () => {
		const errors = {};
		//Clone
		const state = { ...this.state };
		delete state.errors;
		const res = Joi.validate(state, this.schema, { abortEarly: false });
		// console.log(res);
		if (res.error === null) {
			this.setState({ errors: {} });
			return null;
		}
		for (const error of res.error.details) {
			errors[error.path] = error.message;
		}
		//SetState
		this.setState({ errors });
		return errors;
	};

	handleChange = (e) => {
		//Clone
		let state = { ...this.state };
		//Edit
		state[e.currentTarget.name] = e.currentTarget.value;
		//SetState
		this.setState(state);
	};

	render() {
		return (
			<React.Fragment>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<label htmlFor='User'>Username</label>
						<input
							type='text'
							ref={this.username}
							name='username'
							value={this.state.username}
							onChange={this.handleChange}
							className='form-control'
							id='User'
							// aria-describedby='emailHelp'
						/>
						{this.state.errors.username && (
							<div className='alert alert-danger'>
								{this.state.errors.username}
							</div>
						)}
						{/* <small id='emailHelp' className='form-text text-muted'>
							We'll never share your email with anyone else.
						</small> */}
					</div>
					<div className='form-group'>
						<label htmlFor='Password'>Password</label>
						<input
							type='password'
							name='password'
							value={this.state.password}
							onChange={this.handleChange}
							className='form-control'
							id='Password'
						/>
						{this.state.errors.password && (
							<div className='alert alert-danger'>
								{this.state.errors.password}
							</div>
						)}
					</div>
					<button type='submit' className='btn btn-primary'>
						Log in
					</button>
				</form>
			</React.Fragment>
		);
	}
}

export default Login;
