import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
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

const AppTest = () => {
  console.log(axios.get('http://localhost:8000/products'));
  const [products, setProducts] = useState(
    localStorage.getItem('products')
      ? JSON.parse(localStorage.getItem('products'))
      : [],
  );
  const [purchased, setPurchased] = useState(
    localStorage.getItem('purchased')
      ? JSON.parse(localStorage.getItem('purchased'))
      : [],
  );
  const [filter, setFilter] = useState(
    localStorage.getItem('filter')
      ? JSON.parse(localStorage.getItem('filter'))
      : [],
  );
  const [sortValue, setSortValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [values, setValues] = useState({ username: '', password: '' });
  const [userData, setUserData] = useState({
    username: localStorage.getItem('username')
      ? JSON.parse(localStorage.getItem('username'))
      : '',
    password: localStorage.getItem('password')
      ? JSON.parse(localStorage.getItem('password'))
      : '',
  });
  const [logged, setLogged] = useState(false);
  const [errors, setErrors] = useState({});
  // const lol = { name: 'kareem', age: 60 };
  // console.log(axios.post('http://localhost:8000/info/', lol));
  // console.log(axios.get('http://localhost:8000/info'));

  useEffect(() => {
    logged && setPurchased([]);
    // //Get API
    async function getAPI() {
      let { data } = await axios.get('http://localhost:8000/products');
      data.forEach((ele) => {
        ele.count = 0;
      });
      // Set Products & Filter
      localStorage.getItem('products')
        ? JSON.parse(localStorage.getItem('products'))
        : setProducts(data);
      localStorage.getItem('filter')
        ? JSON.parse(localStorage.getItem('filter'))
        : setFilter(data);
    }
    // getAPI();
    getAPI();
    console.log('UseEffect From Hooks !');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, logged]);

  const handleAdminDelete = async (product) => {
    //Call Backend
    await axios.delete('http://localhost:8000/products/' + product.id);
    //Clone & Edit
    let newProducts = products.filter((p) => p.id !== product.id);
    //SetState
    setFilter(newProducts);
    setProducts(newProducts);
    localStorage.setItem('filter', JSON.stringify(newProducts));
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  //Add Product To Cart
  function handleCartAdd(pur) {
    //Clone
    let newPurchased = [...purchased];
    // Edit
    let inCart = false;
    newPurchased.forEach((item) => {
      if (item.id === pur.id) {
        item.count++;
        inCart = true;
      }
    });
    if (!inCart) {
      newPurchased.push({ ...pur, count: 1 });
    }
    //setPurchased
    setPurchased(newPurchased);
    //Put Purchased into local storage
    localStorage.setItem('purchased', JSON.stringify(newPurchased));
  }

  //Remove Product From Cart Within Home Component
  function handleCartRemove(pur) {
    //Clone
    let newPurchased = [...purchased];
    //Edit
    newPurchased = newPurchased.filter((item) => item.id !== pur.id);
    //setPurchased
    setPurchased(newPurchased);
    //Remove Purchased From local storage
    localStorage.setItem('purchased', JSON.stringify(newPurchased));
  }

  //Sorting & Filtering Products
  function handleCustomize(e) {
    //Clone
    let newProducts = [...products];
    let newFilter = [...filter];
    //Edit, setFilter & setSortValue For Sorting
    if (e.currentTarget.name === 'sortValue') {
      if (e.currentTarget.value === 'lowest') {
        newFilter = newFilter.sort((a, b) => a.price - b.price);
        setFilter(newFilter);
        setSortValue(e.currentTarget.value);
      } else if (e.currentTarget.value === 'highest') {
        newFilter = newFilter.sort((a, b) => b.price - a.price);
        setFilter(newFilter);
        setSortValue(e.currentTarget.value);
      } else {
        newFilter = newFilter.sort((a, b) => a.id - b.id);
        setFilter(newFilter);
        setSortValue(e.currentTarget.value);
      }
    }
    //Edit, setFilter & setFilterValue For Filtring
    if (e.currentTarget.name === 'filterValue') {
      if (e.currentTarget.value === 'all') {
        setFilter(newProducts);
        setFilterValue('all');
      } else {
        newProducts = newProducts.filter(
          (p) => p.category === e.currentTarget.value,
        );
        setFilter(newProducts);
        setFilterValue(e.currentTarget.value);
      }
    }
  }

  //Reset All Products Count To 1
  function handleReset() {
    //Clone
    let newPurchased = [...purchased];
    //Edit
    newPurchased = newPurchased.map((pur) => {
      pur.count = 1;
      return pur;
    });
    //setPurchased
    setPurchased(newPurchased);
  }

  //Clear All Products From Cart
  function handleClear() {
    // Clone
    let newPurchased = [...purchased];
    // Edit
    newPurchased = [];
    // setPurchased
    setPurchased(newPurchased);
    //Remove Purchased from local storage
    localStorage.setItem('purchased', JSON.stringify(newPurchased));
  }

  // Remove Product From Cart Within Cart Component
  function handleDelete(product) {
    //Clone
    let newPurchased = [...purchased];
    //Edit
    newPurchased = newPurchased.filter((pur) => pur.id !== product.id);
    //setPurchased
    setPurchased(newPurchased);
    //Remove Purchased from local storage
    localStorage.setItem('purchased', JSON.stringify(newPurchased));
  }

  // Showing Current Products Count
  function handleQuantity(e, pur) {
    //Clone
    console.log(e.target.name);
    let newPurchased = [...purchased];
    let index = newPurchased.indexOf(pur);
    newPurchased[index] = { ...newPurchased[index] };
    //Edit
    if (e.target.name === 'increase') {
      newPurchased[index].count++;
    } else if (e.target.name === 'decrease' && newPurchased[index].count > 0) {
      newPurchased[index].count--;
    }
    //setPurchased
    setPurchased(newPurchased);
  }
  return (
    <React.Fragment>
      <Navbar
        productsPurchased={purchased.length}
        values={values}
        logged={logged}
        userData={userData}
      />
      <Switch>
        <Route
          path='/home'
          render={(props) => (
            <Home
              products={products}
              purchased={purchased}
              filter={filter}
              sortValue={sortValue}
              filterValue={filterValue}
              handleCartAdd={handleCartAdd}
              handleCartRemove={handleCartRemove}
              handleCustomize={handleCustomize}
              handleClear={handleClear}
              {...props}
            />
          )}
        />
        <Redirect exact from='/' to='/home' />
        <Route
          path='/login'
          render={(props) => (
            <Login
              values={values}
              setValues={setValues}
              setErrors={setErrors}
              setLogged={setLogged}
              setUserData={setUserData}
              errors={errors}
            />
          )}
        />
        <Route
          path='/logout'
          render={(props) => (
            <Logout
              values={values}
              setValues={setValues}
              setLogged={setLogged}
              userData={userData}
              setUserData={setUserData}
            />
          )}
        />
        {userData.username === 'admin' && (
          <Route
            path='/admin'
            render={(props) => (
              <Admin
                // products={this.state.products}
                products={products}
                handleAdminDelete={handleAdminDelete}
                {...props}
              />
            )}
          />
        )}
        <Route
          path='/productform/:id'
          render={(props) => (
            <ProductForm
              products={products}
              setProducts={setProducts}
              filter={filter}
              setFilter={setFilter}
              {...props}
            />
          )}
        />
        <Route
          path='/cart'
          render={(props) => (
            <ShoppingCart
              purchased={purchased}
              handleReset={handleReset}
              handleQuantity={handleQuantity}
              handleDelete={handleDelete}
              handleClear={handleClear}
              {...props}
            />
          )}
        />
        <Route
          path='/purchased/:id'
          render={(props) => <Details purchased={purchased} {...props} />}
        />
        <Route path='/notfound' component={NotFound} />
        <Redirect to='/notfound' />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default AppTest;
