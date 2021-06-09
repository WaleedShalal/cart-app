import React from 'react';
import './Home.css';

const Home = (props) => {
	const {
		filter,
		purchased,
		sortValue,
		filterValue,
		handleCustomize,
		handleClear,
		handleCartAdd,
		handleCartRemove,
	} = props;

	return (
		<React.Fragment>
			<div className='d-flex justify-content-center m-3'>
				<div className='sort m-2'>
					Sort by:
					<select value={sortValue} name='sortValue' onChange={handleCustomize}>
						<option value='latest'>Latest</option>
						<option value='lowest'>Lowest</option>
						<option value='highest'>Highest</option>
					</select>
				</div>
				<div className='filter m-2'>
					Filter by:
					<select
						value={filterValue}
						name='filterValue'
						onChange={handleCustomize}>
						<option value='all'>All</option>
						<option value="men's clothing">men's clothing</option>
						<option value="women's clothing">women's clothing</option>
						<option value='jewelery'>jewelery</option>
						<option value='electronics'>electronics</option>
					</select>
				</div>
				<div className='m-1 ml-auto'>
					<button className='btn btn-danger btn-sm ' onClick={handleClear}>
						Remove All
					</button>
				</div>
			</div>
			<div className='container-fluid'>
				<ul className='main-ul list-unstyled'>
					{filter.map((product) => (
						<li key={product.id}>
							<div className='card'>
								<img src={product.image} className='card-img-top' alt='...' />
								<div className='card-body'>
									<p className='card-text'>{product.title}</p>
									<p className='card-text'>{product.price}$</p>
									<div className='btn-container'>
										<button
											onClick={() => handleCartAdd(product)}
											className='btn btn-primary'>
											Add Cart
										</button>
										{purchased.map((pur) =>
											pur.id === product.id ? (
												<button
													key={product.id}
													onClick={() => handleCartRemove(product)}
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
};

export default Home;
