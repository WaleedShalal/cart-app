import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminDeleteAction } from '../../redux/shoppingcart/shoppingCartActions';
import { NavLink } from 'react-router-dom';
import {
  fetchProducts,
  fetchDefaultProducts,
} from '../../redux/shoppingcart/shoppingCartActions';

const Admin = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <h1>Admin</h1>
      <div className='d-flex justify-content-between mb-2'>
        <NavLink to='/productform/new'>
          <button
            onClick={() => history.push('/productform/new')}
            className='btn btn-primary m-1'>
            Add
          </button>
        </NavLink>
        <button
          onClick={() => dispatch(fetchDefaultProducts())}
          className='btn btn-primary m-1'>
          Reset Default
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Pro.Img</th>
            <th scope='col'>Pro.Des</th>
            <th scope='col'>Price</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {fetchedData.products.map((product, index) => {
            return (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img className='cart-img' src={product.image} alt='' />
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <i
                    onClick={() => history.push(`/productform/${product.id}`)}
                    style={{ cursor: 'pointer' }}
                    className='fas fa-edit'></i>
                </td>
                <td>
                  <i
                    onClick={() => dispatch(adminDeleteAction(product))}
                    className='fas fa-trash'
                    style={{ cursor: 'pointer' }}></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Admin;
