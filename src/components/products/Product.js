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
						<div className='d-flex'>
							<button
								name='decrease'
								onClick={(e) =>
									this.props.handleQuantity(e, this.props.purchased)
								}
								className='btn btn-primary btn-sm'>
								-
							</button>
							<div className='ml-3 mr-3'>{this.props.purchased.count}</div>
							<button
								name='increase'
								onClick={(e) =>
									this.props.handleQuantity(e, this.props.purchased)
								}
								className='btn btn-primary btn-sm'>
								+
							</button>
						</div>
					</td>
					<td>
						<i
							style={{ cursor: 'pointer' }}
							className='fas fa-trash m-2 btn btn-outline-danger'
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
