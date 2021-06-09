import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Admin extends Component {
	state = {};

	handleMenuList = () => {
		const product = this.props.products.map((product) => {
			return (
				<tr key={product.id}>
					<td>{product.id}</td>
					<td>{product.name}</td>
					<td>{product.price}</td>
					<td>
						<i
							onClick={() =>
								this.props.history.push(`/productform/${product.id}`)
							}
							style={{ cursor: 'pointer' }}
							className='fas fa-edit'></i>
					</td>
					<td>
						<i
							onClick={() => this.props.handleAdminDelete(product)}
							className='fas fa-trash'
							style={{ cursor: 'pointer' }}></i>
					</td>
				</tr>
			);
		});
		return product;
	};

	render() {
		return (
			<React.Fragment>
				<h1>Admin</h1>
				<NavLink to='/productform/new'>
					<button
						onClick={() => this.props.history.push('/productform/new')}
						className='btn btn-primary'>
						Add
					</button>
				</NavLink>
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Name</th>
							<th scope='col'>Price</th>
							<th scope='col'>Edit</th>
							<th scope='col'>Delete</th>
						</tr>
					</thead>
					<tbody>{this.handleMenuList()}</tbody>
				</table>
			</React.Fragment>
		);
	}
}

export default Admin;
