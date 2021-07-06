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
			<div className='container-fluid'>
				<div className='row'>
					{purchased.length === 0 ? (
						<h4 className='text-center m-2'>No Items To Show</h4>
					) : (
						<div className='cart-table table-responsive'>
							<button
								className='btn btn-primary btn-sm m-2'
								onClick={handleReset}>
								Reset All
							</button>
							<button
								className='btn btn-outline-danger btn-sm m-2'
								onClick={handleClear}>
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
				</div>
			</div>
		</React.Fragment>
	);
};

export default ShoppingCart;
