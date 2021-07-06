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
			<main className='container'>
				<div className='row'>
					<div className='options'>
						<div className='filter col-sm-12 col-md-5'>
							<span>Filter by : </span>
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
						<div className='sort col-sm-12 col-md-4'>
							<span>Sort by : </span>
							<select
								value={sortValue}
								name='sortValue'
								onChange={handleCustomize}>
								<option value='latest'>Latest</option>
								<option value='lowest'>Lowest</option>
								<option value='highest'>Highest</option>
							</select>
						</div>
						{purchased.length > 0 && (
							<div className='button col-sm-12 col-md-3'>
								<button
									className='btn btn-outline-danger btn-sm'
									onClick={handleClear}>
									Remove All
								</button>
							</div>
						)}
					</div>
				</div>
				<div className='row'>
					<div className='products'>
						{filter.map((product) => (
							<div key={product.id} className='card'>
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
													className='btn btn-outline-danger'>
													Remove Cart
												</button>
											) : null,
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</React.Fragment>
	);
};

export default Home;
