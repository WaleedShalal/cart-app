import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Admin = (props) => {
	console.log(axios.get('http://localhost:8000/products'));

	const handleMenuList = () => {
		const product = props.products.map((product, index) => {
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
							onClick={() => props.history.push(`/productform/${product.id}`)}
							style={{ cursor: 'pointer' }}
							className='fas fa-edit'></i>
					</td>
					<td>
						<i
							onClick={() => props.handleAdminDelete(product)}
							className='fas fa-trash'
							style={{ cursor: 'pointer' }}></i>
					</td>
				</tr>
			);
		});
		return product;
	};
	console.log(axios.get('http://localhost:8000/products'));
	return (
		<React.Fragment>
			<h1>Admin</h1>
			<NavLink to='/productform/new'>
				<button
					onClick={() => props.history.push('/productform/new')}
					className='btn btn-primary'>
					Add
				</button>
			</NavLink>
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
				<tbody>{handleMenuList()}</tbody>
			</table>
		</React.Fragment>
	);
};

export default Admin;
