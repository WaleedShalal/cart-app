import React, { Component } from 'react';
import Product from '../products/Product';
import './Cart.css';

class ShoppingCart extends Component {
	handleTotal = () => {
		let total = [];
		// eslint-disable-next-line array-callback-return
		this.props.purchased.map((pur) => {
			total.push(pur.price * pur.count);
		});
		let y = 0;
		for (let i in total) {
			y += total[i];
		}
		return y.toFixed(2);
	};

	render() {
		console.log(this.props.purchased);
		const {
			purchased,
			handleReset,
			handleDelete,
			handleQuantity,
			// handleDecrease,
		} = this.props;
		return (
			<React.Fragment>
				<h1>Shopping Cart</h1>
				{purchased.length === 0 ? (
					<h4>No Items To Show</h4>
				) : (
					<div>
						<button
							className='btn btn-primary btn-sm m-2'
							onClick={handleReset}>
							Reset All
						</button>
						<table className='table'>
							<thead>
								<tr className='text-left'>
									<th scope='col'>#</th>
									<th scope='col'>Pro.Img</th>
									<th scope='col'>Pro.Des</th>
									<th scope='col'> Quantity</th>
									<th scope='col'>Delete</th>
									<th scope='col'>Total</th>
								</tr>
							</thead>
							<tbody className='text-left'>
								{purchased.map((product, index) => (
									<Product
										key={product.id}
										num={index}
										purchased={product}
										handleDelete={handleDelete}
										handleQuantity={handleQuantity}>
										<span>{index + 1}- </span>
									</Product>
								))}
								<tr>
									<td colSpan='5'></td>
									<td className='font-weight-bold'>{this.handleTotal()}$</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default ShoppingCart;
