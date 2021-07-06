import React from 'react';
import './Details.css';

const Details = (props) => {
	const handleBack = () => {
		props.history.replace('/cart');
	};
	const purchased = props.purchased.filter(
		(p) => p.id === parseInt(props.match.params.id),
	)[0];
	return (
		<React.Fragment>
			<div className='full-details container-fluid'>
				<h2 className='d-flex'>Details For Product</h2>
				<div className='row'>
					<div className='col-sm-4 d-flex'>
						<img className='product-img' src={purchased.image} alt='' />
					</div>
					<div className='col-sm-8 product-info d-flex'>
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
					<div className='col-12 d-flex mb-4'>
						<button onClick={handleBack} className='btn btn-primary'>
							Back To ShoppingCart
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Details;
