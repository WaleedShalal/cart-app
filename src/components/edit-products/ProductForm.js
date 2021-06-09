// import React, { Component } from 'react';
// import axios from 'axios';

// class ProductForm extends Component {
//   state = {
//     name: '',
//     price: '',
//     id: '',
//   };

//   async componentDidMount() {
//     const id = this.props.match.params.id;
//     console.log(id);
//     if (id !== 'new') {
//       const { data } = await axios.get('http://localhost:3000/products/' + id);
//       //Clone
//       const state = { ...this.state };
//       //Edit
//       state.name = data.name;
//       state.price = data.price;
//       state.id = data.id;
//       //SetState
//       this.setState(state);
//     }
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('submitted');
//     //Add
//     if (this.props.match.params.id === 'new') {
//       //Call Backend
//       const obj = { ...this.state, count: 0, isCart: false };
//       await axios.post('http://localhost:3000/products/', obj);
//       //Edit
//     } else {
//       //Call Backend
//       const obj = { ...this.state, count: 0, isCart: false };
//       delete obj.id;
//       await axios.put('http://localhost:3000/products/' + this.state.id, obj);
//     }

//     // this.props.history.replace('/admin');
//   };

//   handleChange = (e) => {
//     //Clone
//     const state = { ...this.state };
//     //Edit
//     state[e.currentTarget.name] = e.currentTarget.value;
//     //SetState
//     this.setState(state);
//   };

//   render() {
//     console.log(this.props.match.params.id);
//     return (
//       <React.Fragment>
//         {this.props.match.params.id === 'new' ? (
//           <h1>Add Product</h1>
//         ) : (
//           <h1>Edit Product</h1>
//         )}
//         <form onSubmit={this.handleSubmit}>
//           <div className='form-group'>
//             <label htmlFor='User'>Name</label>
//             <input
//               type='text'
//               name='name'
//               className='form-control'
//               id='Name'
//               value={this.state.name}
//               onChange={this.handleChange}
//             />
//           </div>
//           <div className='form-group'>
//             <label htmlFor='Price'>Price</label>
//             <input
//               type='number'
//               name='price'
//               className='form-control'
//               id='Price'
//               value={this.state.price}
//               onChange={this.handleChange}
//             />
//           </div>
//           {this.props.match.params.id === 'new' ? (
//             <button type='submit' className='btn btn-primary'>
//               Add
//             </button>
//           ) : (
//             <button type='submit' className='btn btn-primary'>
//               Edit
//             </button>
//           )}
//         </form>
//       </React.Fragment>
//     );
//   }
// }

// export default ProductForm;
