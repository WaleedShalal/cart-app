import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeCart,
  removeAllCart,
  resetCart,
  itemQuantity,
} from '../../redux/shoppingcart/shoppingCartActions';
import './Cart.css';
import '../products/Product.css';

const ShoppingCart = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleTotal = () => {
    let total = [];
    fetchedData.purchased.map((pur) => total.push(pur.price * pur.count));
    let sumTotal = 0;
    for (let i in total) {
      sumTotal += total[i];
    }
    return sumTotal.toFixed(2);
  };
  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          {fetchedData.purchased.length === 0 ? (
            <h4 className='text-center m-2'>No Items To Show</h4>
          ) : (
            <div className='cart-table table-responsive'>
              <button
                className='btn btn-primary btn-sm m-2'
                onClick={() => dispatch(resetCart())}>
                Reset All
              </button>
              <button
                className='btn btn-outline-danger btn-sm m-2'
                onClick={() => dispatch(removeAllCart())}>
                Clear All
              </button>
              <table className='table'>
                <thead>
                  <tr className='text-left'>
                    <th>#</th>
                    <th>Pro.Img</th>
                    <th>Pro.Des</th>
                    <th> Quantity</th>
                    <th>Delete</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody className='text-left'>
                  {fetchedData.purchased.map((product, index) => (
                    <tr key={product.id}>
                      <td>
                        <span>{index + 1}- </span>
                      </td>
                      <td>
                        <img className='cart-img' src={product.image} alt='' />
                      </td>
                      <td>
                        <Link to={`/purchased/${product.id}`}>
                          {product.description}
                        </Link>
                      </td>
                      <td>
                        <div className='d-flex'>
                          <button
                            name='decrease'
                            onClick={(e) => dispatch(itemQuantity(e, product))}
                            className='btn btn-primary btn-sm'>
                            -
                          </button>
                          <div className='ml-3 mr-3'>{product.count}</div>
                          <button
                            name='increase'
                            onClick={(e) => dispatch(itemQuantity(e, product))}
                            className='btn btn-primary btn-sm'>
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <i
                          style={{ cursor: 'pointer' }}
                          className='fas fa-trash m-2 btn btn-outline-danger'
                          onClick={() => dispatch(removeCart(product))}></i>
                      </td>
                      <td>{(product.count * product.price).toFixed(2)}$</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan='5'></td>
                    <td className='font-weight-bold'>{handleTotal()}$</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShoppingCart;
