import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = (props) => {
	const { products, setProducts, setFilter } = props;
	const [newProduct, setNewProduct] = useState({
		id: '',
		title: '',
		price: '',
		image: '',
		description: '',
		category: '',
	});
	useEffect(() => {
		let num = props.match.params.id;
		if (num !== 'new') {
			async function letAPI() {
				let { data } = await axios.get('http://localhost:8000/products/' + num);
				setNewProduct({
					id: data.id,
					title: data.title,
					price: data.price,
					image: data.image,
					description: data.description,
					category: data.category,
				});
			}
			letAPI();
		}
		console.log('Render From ProductForm');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(newProduct);

	const handleChange = (e) => {
		let { name, value, type } = e.target;
		console.log(typeof value);
		setNewProduct({
			...newProduct,
			count: 0,
			[name]: type === 'number' ? +value : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('submitted');
		//Add
		if (props.match.params.id === 'new') {
			//Call Backend
			let testPro = [...products];
			testPro.push(newProduct);
			setProducts(testPro);
			setFilter(testPro);
			await axios.post('http://localhost:8000/products/', newProduct);
			localStorage.setItem('products', JSON.stringify(testPro));
			localStorage.setItem('filter', JSON.stringify(testPro));
			//Edit
		} else {
			//Call Backend
			let testPro = [...products];
			testPro = testPro.filter((obj) => obj.id !== +props.match.params.id);
			testPro.push(newProduct);
			testPro = testPro.sort((a, b) => a.id - b.id);
			setProducts(testPro);
			setFilter(testPro);
			let lolTest = { ...newProduct };
			delete lolTest.id;
			await axios.put(
				'http://localhost:8000/products/' + newProduct.id,
				lolTest,
			);
			localStorage.setItem('products', JSON.stringify(testPro));
			localStorage.setItem('filter', JSON.stringify(testPro));
		}
		props.history.replace('/admin');
	};
	return (
		<React.Fragment>
			<h1>
				{props.match.params.id === 'new' ? 'Add Product' : 'Edit Product'}
			</h1>
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
					{props.match.params.id === 'new' ? 'Add' : 'Edit'}
				</button>
			</form>
		</React.Fragment>
	);
};

export default ProductForm;
