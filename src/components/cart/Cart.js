import React from 'react';
import Product from '../products/Product';
import './Cart.css';

const ShoppingCart = (props) => {
	const { purchased, handleReset, handleDelete, handleClear, handleQuantity } =
		props;
	const handleTotal = () => {
		let total = [];
		purchased.map((pur) => total.push(pur.price * pur.count));
		let sumTotal = 0;
		for (let i in total) {
			sumTotal += total[i];
		}
		return sumTotal.toFixed(2);
	};
	return (
		<React.Fragment>
			{purchased.length === 0 ? (
				<h4 className='text-center m-2'>No Items To Show</h4>
			) : (
				<div>
					<button className='btn btn-primary btn-sm m-2' onClick={handleReset}>
						Reset All
					</button>
					<button className='btn btn-danger btn-sm m-2' onClick={handleClear}>
						Clear All
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
								<td className='font-weight-bold'>{handleTotal()}$</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</React.Fragment>
	);
};

export default ShoppingCart;
