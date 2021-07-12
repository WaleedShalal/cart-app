import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import ShoppingCart from './components/cart/Cart';
import Details from './components/product-details/Details';
import NotFound from './components/notfound/NotFound';
import ProductForm from './components/edit-products/ProductForm';
import Login from './components/login/Login';
import Logout from './components/login/Logout';
import Admin from './components/admin/Admin';
import Footer from './components/footer/Footer';
import { fetchProducts } from './redux/shoppingcart/shoppingCartActions';
import AboutApp from './components/about-app/AboutApp';

const App = () => {
  const { loginInfo } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path='/home' component={Home} />
        <Redirect exact from='/' to='/home' />
        <Route path='/about' component={AboutApp} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        {loginInfo.userData.username === 'admin' && (
          <Route path='/admin' component={Admin} />
        )}
        <Route path='/productform/:id' component={ProductForm} />
        <Route path='/cart' component={ShoppingCart} />
        <Route path='/purchased/:id' component={Details} />
        <Route path='/notfound' component={NotFound} />
        <Redirect to='/notfound' />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default App;
