import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

class Product extends Component {
	render() {
		return (
			<React.Fragment>
				<tr>
					<td>{this.props.children}</td>
					<td>
						<img className='cart-img' src={this.props.purchased.image} alt='' />
					</td>
					<td>
						<Link to={`/purchased/${this.props.purchased.id}`}>
							{this.props.purchased.description}
						</Link>
					</td>
					<td>
						<input
							className='cart-input text-center'
							type='number'
							min='0'
							value={this.props.purchased.count}
							onChange={(e) =>
								this.props.handleQuantity(e, this.props.purchased)
							}
						/>
					</td>
					<td>
						<i
							style={{ cursor: 'pointer' }}
							className='fas fa-trash m-2'
							onClick={() => this.props.handleDelete(this.props.purchased)}></i>
					</td>
					<td>
						{(this.props.purchased.count * this.props.purchased.price).toFixed(
							2,
						)}
						$
					</td>
				</tr>
			</React.Fragment>
		);
	}
}

export default Product;
