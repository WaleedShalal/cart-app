import React, { Component } from 'react';
import './Details.css';

class Details extends Component {
	handleBack = () => {
		this.props.history.replace('/cart');
	};

	render() {
		const purchased = this.props.purchased.filter(
			(p) => p.id === parseInt(this.props.match.params.id),
		)[0];
		return (
			<React.Fragment>
				<h1 className='mb-4 text-left'>Details For Product</h1>
				<div className='row d-flex'>
					<div className='col-4 d-flex'>
						<img className='img-details' src={purchased.image} alt='' />
					</div>
					<div className='col-8 d-flex flex-column product-details'>
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
					<div className='col-12 d-flex'>
						<button onClick={this.handleBack} className='btn btn-primary'>
							Back To ShoppingCart
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Details;
