import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import ShoppingCart from './components/cart/Cart';
import Details from './components/product-details/Details';
import NotFound from './components/notfound/NotFound';
import ProductForm from './components/edit-products/ProductForm';
// import Login from './Login';
// import Admin from './Admin';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			purchased: localStorage.getItem('purchased')
				? JSON.parse(localStorage.getItem('purchased'))
				: [],
			filter: [],
			sortValue: '',
			filterValue: '',
		};
	}

	async componentDidMount() {
		//Get API
		let { data } = await axios.get('https://fakestoreapi.com/products');
		data.forEach((ele) => {
			ele.count = 0;
		});
		//SetState
		this.setState({ products: data, filter: data });
	}
	//## Not Finished Yet ##
	// handleAdminDelete = async (product) => {
	// 	//Call Backend
	// 	await axios.delete('https://fakestoreapi.com/products/' + product.id);
	// 	//Clone & Edit
	// 	let products = this.state.products.filter((p) => p.id !== product.id);
	// 	//SetState
	// 	this.setState({ products });
	// };

	//Add Product To Cart
	handleCartAdd = (pur) => {
		//Clone
		let purchased = [...this.state.purchased];
		//Edit
		let inCart = false;
		purchased.forEach((item) => {
			if (item.id === pur.id) {
				item.count++;
				inCart = true;
			}
		});
		if (!inCart) {
			purchased.push({ ...pur, count: 1 });
		}
		//SetState
		this.setState({ purchased });
		//Put Purchased & Filter into local storage
		localStorage.setItem('purchased', JSON.stringify(purchased));
	};

	//Remove Product From Cart Within Home Component
	handleCartRemove = (pur) => {
		//Clone
		let purchased = [...this.state.purchased];
		//Edit
		purchased = purchased.filter((item) => item.id !== pur.id);
		//SetState
		this.setState({ purchased });
		localStorage.setItem('purchased', JSON.stringify(purchased));
	};

	//Sorting & Filtering Products
	handleCustomize = (e) => {
		//Clone
		let products = [...this.state.products];
		let filter = [...this.state.filter];
		//Edit & SetState For Sorting
		if (e.currentTarget.name === 'sortValue') {
			if (e.currentTarget.value === 'lowest') {
				this.setState({
					filter: filter.sort((a, b) => a.price - b.price),
					sortValue: e.currentTarget.value,
				});
			} else if (e.currentTarget.value === 'highest') {
				this.setState({
					filter: filter.sort((a, b) => b.price - a.price),
					sortValue: e.currentTarget.value,
				});
			} else {
				this.setState({
					filter: filter.sort((a, b) => a.id - b.id),
					sortValue: e.currentTarget.value,
				});
			}
		}
		//Edit & SetState For Filtering
		if (e.currentTarget.name === 'filterValue') {
			if (e.currentTarget.value === 'all') {
				this.setState({ filter: products, filterValue: 'all' });
			} else {
				products = products.filter((p) => p.category === e.currentTarget.value);
				//SetState
				this.setState({ filter: products, filterValue: e.currentTarget.value });
			}
		}
	};

	//Reset All Products Count To 1
	handleReset = () => {
		//Clone
		let purchased = [...this.state.purchased];
		//Edit
		purchased = purchased.map((p) => {
			p.count = 1;
			return p;
		});
		//SetState
		this.setState({ purchased });
	};

	//Clear All Products From Cart
	handleClear = () => {
		//Clone
		let purchased = [...this.state.purchased];
		//Edit
		purchased = [];
		//SetState
		this.setState({ purchased });
	};

	//Remove Product From Cart Within Cart Component
	handleDelete = (product) => {
		//Clone
		let filter = [...this.state.filter];
		let purchased = [...this.state.purchased];
		//Edit
		let deletedProduct = filter.filter((pro) => pro.id === product.id)[0];
		let indexProduct = filter.indexOf(deletedProduct);
		filter[indexProduct] = { ...filter[indexProduct] };
		filter[indexProduct].isCart = false;
		purchased = purchased.filter((p) => p.id !== product.id);
		//SetState
		this.setState({ filter, purchased });
		//Remove Purchased from local storage
		localStorage.setItem('purchased', JSON.stringify(purchased));
	};

	//Showing Current Products Count
	handleQuantity = (e, pur) => {
		//Clone
		let purchased = [...this.state.purchased];
		let index = purchased.indexOf(pur);
		purchased[index] = { ...purchased[index] };
		//Edit
		purchased[index].count = e.target.value;
		//SetState
		this.setState({ purchased });
	};

	render() {
		const { products, filter, purchased, sortValue, filterValue } = this.state;
		return (
			<React.Fragment>
				<Navbar productsPurchased={purchased.length} />
				<main className='container'>
					<Switch>
						<Route
							path='/home'
							render={(props) => (
								<Home
									products={products}
									purchased={purchased}
									filter={filter}
									sortValue={sortValue}
									filterValue={filterValue}
									handleCartAdd={this.handleCartAdd}
									handleCartRemove={this.handleCartRemove}
									handleCustomize={this.handleCustomize}
									{...props}
								/>
							)}
						/>
						<Redirect exact from='/' to='/home' />
						{/* 
						## Not Finished Yet ##
						<Route path='/login' component={Login} /> 
						*/}
						{/* 
						// ## Not Finished Yet ##
						<Route
							path='/admin'
							render={(props) => (
								<Admin
									products={this.state.products}
									handleAdminDelete={this.handleAdminDelete}
									{...props}
								/>
							)}
						/> */}
						<Route
							path='/productform/:id'
							render={(props) => <ProductForm products={products} {...props} />}
						/>
						<Route
							path='/cart'
							render={(props) => (
								<ShoppingCart
									purchased={purchased}
									handleReset={this.handleReset}
									handleQuantity={this.handleQuantity}
									handleDelete={this.handleDelete}
									handleClear={this.handleClear}
									{...props}
								/>
							)}
						/>
						<Route
							path='/purchased/:id'
							render={(props) => <Details purchased={purchased} {...props} />}
						/>
						<Route path='/notfound' component={NotFound} />
						<Redirect to='/notfound' />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
