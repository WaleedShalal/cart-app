import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import axios from 'axios';
import './Navbar.css';

class Navbar extends Component {
	// state = {
	// 	username: '',
	// };

	// async componentDidMount() {
	// 	const { data } = await axios.get('http://localhost:3000/user/');
	// 	//Clone
	// 	const state = { ...this.state };
	// 	//Edit
	// 	state.username = data.username;
	// 	//SetState
	// 	this.setState(state);
	// }

	render() {
		return (
			<nav className='main-nav navbar navbar-expand-lg navbar-dark bg-dark'>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/home'>
								Home
							</NavLink>
						</li>
						{/* {this.state.username === 'admin' && (
							<li className='nav-item'>
								<NavLink className='nav-link' to='/admin'>
									Admin
								</NavLink>
							</li>
						)} */}

						<li className='nav-item'>
							<NavLink className='nav-link' to='/cart'>
								ShoppingCart
							</NavLink>
						</li>
					</ul>
					<ul className='d-flex ml-auto navbar-nav'>
						{/* <li className='nav-item ml-auto'>
							<NavLink className='nav-link' to='/login'>
								Login
							</NavLink>
						</li> */}
					</ul>
				</div>
				<span className='badge badge-primary'>
					<i className='fas fa-shopping-cart'></i>
					{this.props.productsPurchased}
				</span>
				{/* <span className='badge badge-primary m-2'>
					<i className='far fa-user'></i> {this.state.username}
				</span> */}
				{/* {this.state.username !== 'admin' && (
				)} */}
			</nav>
		);
	}
}

export default Navbar;
