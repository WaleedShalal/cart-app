import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
	return (
		<div>
			<h1>Page Not Found</h1>
			<NavLink to='/home'>
				<button className='btn btn-primary btn-sm '>Back Home</button>
			</NavLink>
		</div>
	);
};

export default NotFound;
