import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  adminAddAction,
  adminEditAction,
} from '../../redux/shoppingcart/shoppingCartActions';

const ProductForm = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    id: '',
    title: '',
    price: '',
    image: '',
    description: '',
    category: '',
  });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let num = id;
    if (num !== 'new') {
      setNewProduct(
        fetchedData.products.filter((product) => product.id === +num)[0],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    setNewProduct({
      ...newProduct,
      count: 0,
      [name]: type === 'number' ? +value : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Add
    if (id === 'new') {
      //Call Backend
      dispatch(adminAddAction(newProduct));
      //Edit
    } else {
      //Call Backend
      let product = { ...newProduct };
      delete product.id;
      dispatch(adminEditAction(newProduct.id, product));
    }
    history.replace('/admin');
  };
  return (
    <React.Fragment>
      <h1>{id === 'new' ? 'Add Product' : 'Edit Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='id'>ID</label>
          <input
            type='number'
            name='id'
            id='id'
            value={newProduct.id}
            onChange={handleChange}
            spellCheck='false'
            className='form-control'
            step='1'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            className='form-control'
            id='title'
            value={newProduct.title}
            onChange={handleChange}
            spellCheck='false'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            id='price'
            value={newProduct.price}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            value={newProduct.description}
            onChange={handleChange}
            spellCheck='false'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='category'>category</label>
          <input
            type='text'
            name='category'
            id='category'
            spellCheck='false'
            value={newProduct.category}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='image'>Image URL</label>
          <input
            type='text'
            name='image'
            id='image'
            spellCheck='false'
            value={newProduct.image}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          {id === 'new' ? 'Add' : 'Edit'}
        </button>
      </form>
    </React.Fragment>
  );
};

export default ProductForm;
