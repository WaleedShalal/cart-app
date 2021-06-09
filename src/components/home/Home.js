import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='d-flex justify-content-center'>
					<div className='sort m-2'>
						Sort by:
						<select
							value={this.props.sortValue}
							name='sortValue'
							onChange={this.props.handleCustomize}>
							<option value='latest'>Latest</option>
							<option value='lowest'>Lowest</option>
							<option value='highest'>Highest</option>
						</select>
					</div>
					<div className='filter m-2'>
						Filter by:
						<select
							value={this.props.filterValue}
							name='filterValue'
							onChange={this.props.handleCustomize}>
							<option value='all'>All</option>
							<option value="men's clothing">men's clothing</option>
							<option value="women's clothing">women's clothing</option>
							<option value='jewelery'>jewelery</option>
							<option value='electronics'>electronics</option>
						</select>
					</div>
				</div>
				<div className='container-fluid'>
					<ul className='main-ul list-unstyled'>
						{this.props.filter.map((product) => (
							<li key={product.id}>
								<div className='card'>
									<img src={product.image} className='card-img-top' alt='...' />
									<div className='card-body'>
										<p className='card-text'>{product.title}</p>
										<p className='card-text'>{product.price}$</p>
										<div className='btn-container'>
											<button
												onClick={() => this.props.handleCartAdd(product)}
												className='btn btn-primary'>
												Add Cart
											</button>
											{this.props.purchased.map((pur) =>
												pur.id === product.id ? (
													<button
														key={product.id}
														onClick={() => this.props.handleCartRemove(product)}
														className='btn btn-danger'>
														Remove Cart
													</button>
												) : null,
											)}
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
