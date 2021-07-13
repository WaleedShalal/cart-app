import React from 'react';
import './AboutApp.css';

function AboutApp() {
  return (
    <div>
      <h2 className='ml-3'>About App</h2>
      <ul className='main-ul'>
        <li className='text-capitalize'>
          this is simple shoppingcart app using react (hooks &amp; redux).
        </li>
        <li className='text-capitalize'>
          this app comes with simple responsive design.
        </li>
        <li className='text-capitalize'>
          this app contains :
          <ul className='sub-ul'>
            <li className='text-capitalize'>
              navbar component to route between copmnents and show number of
              items in cart.
            </li>
            <li className='text-capitalize'>
              login component for users &#10100;
              username:"any...",password:"any..." &#10101; and for admin access{' '}
              {''}
              <strong>
                &#10100; username: <span>"admin"</span> ,password:"any..."
                &#10101;
              </strong>
            </li>
            <li className='text-capitalize'>
              admin component which appear just with admin user to add, edit and
              delete products.
            </li>
            <li className='text-capitalize'>
              home component to display all available products.
            </li>
            <li className='text-capitalize'>
              shoppingcart component to display all purchased products.
            </li>
            <li className='text-capitalize'>
              deatils component to display full purchased product info.
            </li>
            <li className='text-capitalize'>
              notfound component to appear if path doesn't match any of these
              component.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default AboutApp;
