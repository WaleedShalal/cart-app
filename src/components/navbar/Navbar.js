import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = (props) => {
  const purchased = useSelector((state) => state.fetchedData.purchased);
  const { loginInfo } = useSelector((state) => state);
  return (
    <React.Fragment>
      <div className='upper-nav container-fluid '>
        <div className='left-side'>
          <NavLink className='about-app' to='/about'>
            <i className='fas fa-exclamation-circle mr-1'></i>
            About App
          </NavLink>
        </div>
        <div className='right-side'>
          <div className='user'>
            <i className='far fa-user'></i>
            Hi, {loginInfo.userData.username}
            {/* {JSON.parse(localStorage.getItem('username'))} */}
          </div>
          <div className='logs'>
            {loginInfo.userData.username === '' ? (
              <NavLink className='login' to='/login'>
                Login
              </NavLink>
            ) : (
              <NavLink className='logout' to='/logout'>
                Logout
              </NavLink>
            )}
          </div>
          <div className='ml-1'>
            <span className='badge badge-primary'>
              <i className='fas fa-shopping-cart'></i>
              {purchased.length}
            </span>
          </div>
        </div>
      </div>
      <nav className='main-nav navbar navbar-expand-lg navbar-dark bg-dark'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/home'>
                Home
              </NavLink>
            </li>
            {loginInfo.userData.username === 'admin' && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='/admin'>
                  Admin
                </NavLink>
              </li>
            )}
            <li className='nav-item'>
              <NavLink className='nav-link' to='/cart'>
                ShoppingCart
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
