import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const history = useHistory();
  const { fetchedData } = useSelector((state) => state);
  const handleBack = () => {
    history.replace('/cart');
  };
  const purchased = fetchedData.purchased.filter(
    (p) => p.id === parseInt(id),
  )[0];
  return (
    <React.Fragment>
      <div className='full-details container-fluid'>
        <h2 className='d-flex'>Details For Product</h2>
        <div className='row'>
          <div className='col-sm-4 d-flex'>
            <img className='product-img' src={purchased.image} alt='' />
          </div>
          <div className='col-sm-8 product-info d-flex'>
            <div>
              <span>Product Title</span> : {purchased.title}.
            </div>
            <div>
              <span>Product Desciption</span> : {purchased.description}.
            </div>
            <div>
              <span>Product Price</span> :{purchased.price}$.
            </div>
            <div>
              <span>Product Count</span> : {purchased.count}
            </div>
          </div>
          <div className='col-12 d-flex mb-4'>
            <button onClick={handleBack} className='btn btn-primary'>
              Back To ShoppingCart
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Details;
