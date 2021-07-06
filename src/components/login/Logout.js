import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = (props) => {
	const { setValues, setLogged, setUserData, userData } = props;
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
		setValues({ username: '', password: '' });
		setLogged(true);
		let user = '';
		let pass = '';
		setUserData({ username: '', password: '' });
		localStorage.setItem('username', JSON.stringify(user));
		localStorage.setItem('password', JSON.stringify(pass));
	};

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setValues({
	// 		...values,
	// 		[name]: value,
	// 	});
	// };

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
						value={userData.username}
						onChange={() => userData.username}
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
						value={userData.password}
						onChange={() => userData.username}
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
