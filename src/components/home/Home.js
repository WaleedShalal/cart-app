import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addCart,
  removeCart,
  removeAllCart,
  showSortAndFilter,
} from '../../redux/shoppingcart/shoppingCartActions';
import './Home.css';

const Home = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginInfo } = useSelector((state) => state);

  useEffect(() => {
    loginInfo.logged && dispatch(removeAllCart());
  }, [dispatch, loginInfo.logged, loginInfo.userData]);

  return (
    <React.Fragment>
      <main className='container'>
        <div className='row'>
          <div className='options'>
            <div className='filter col-sm-12 col-md-5'>
              <span>Filter by : </span>
              <select
                value={fetchedData.filterValue}
                name='FILTER_VALUE'
                onChange={(e) =>
                  dispatch(
                    showSortAndFilter(
                      e,
                      fetchedData.products,
                      fetchedData.filter,
                    ),
                  )
                }>
                <option value='all'>All</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
                <option value='jewelery'>jewelery</option>
                <option value='electronics'>electronics</option>
              </select>
            </div>
            <div className='sort col-sm-12 col-md-4'>
              <span>Sort by : </span>
              <select
                value={fetchedData.sortValue}
                name='SORT_VALUE'
                onChange={(e) =>
                  dispatch(
                    showSortAndFilter(
                      e,
                      fetchedData.products,
                      fetchedData.filter,
                    ),
                  )
                }>
                <option value='latest'>Latest</option>
                <option value='lowest'>Lowest</option>
                <option value='highest'>Highest</option>
              </select>
            </div>
            {fetchedData.purchased.length > 0 && (
              <div className='button col-sm-12 col-md-3'>
                <button
                  className='btn btn-outline-danger btn-sm'
                  onClick={() => dispatch(removeAllCart())}>
                  Remove All
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='products'>
            {fetchedData.filter.map((product) => (
              <div key={product.id} className='card'>
                <img src={product.image} className='card-img-top' alt='...' />
                <div className='card-body'>
                  <p className='card-text'>{product.title}</p>
                  <p className='card-text'>{product.price}$</p>
                  <div className='btn-container'>
                    <button
                      onClick={() => dispatch(addCart(product))}
                      className='btn btn-primary'>
                      Add Cart
                    </button>
                    {fetchedData.purchased.map((pur) =>
                      pur.id === product.id ? (
                        <button
                          key={product.id}
                          onClick={() => dispatch(removeCart(product))}
                          className='btn btn-outline-danger'>
                          Remove Cart
                        </button>
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
