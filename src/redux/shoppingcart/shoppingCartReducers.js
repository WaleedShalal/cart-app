import * as actionsTypes from './shoppingCartTypes';

const initialState = {
  loading: false,
  products: localStorage.getItem('products')
    ? JSON.parse(localStorage.getItem('products'))
    : [],
  filter: localStorage.getItem('filter')
    ? JSON.parse(localStorage.getItem('filter'))
    : [],
  purchased: localStorage.getItem('purchased')
    ? JSON.parse(localStorage.getItem('purchased'))
    : [],
  sortValue: localStorage.getItem('sortValue')
    ? JSON.parse(localStorage.getItem('sortValue'))
    : '',
  filterValue: localStorage.getItem('filterValue')
    ? JSON.parse(localStorage.getItem('filterValue'))
    : '',
  errors: '',
};
export const fetchProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case actionsTypes.FETCH_PRODUCTS_SUCCESS:
      localStorage.setItem('filter', JSON.stringify(action.items));
      localStorage.setItem('products', JSON.stringify(action.items));
      return {
        ...state,
        loading: false,
        products: action.items,
        filter: action.items,
        errors: '',
      };
    case actionsTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        filter: [],
        errors: action.errors,
      };
    case actionsTypes.ADD_CART: {
      //Clone
      let purchased = [...state.purchased];
      // Edit
      let inCart = false;
      purchased.forEach((item) => {
        if (item.id === action.item.id) {
          item.count++;
          inCart = true;
        }
      });
      if (!inCart) {
        purchased.push({ ...action.item, count: 1 });
      }
      localStorage.setItem('purchased', JSON.stringify(purchased));
      return { ...state, purchased };
    }
    case actionsTypes.REMOVE_CART: {
      //Clone
      let purchased = [...state.purchased];
      //Edit
      purchased = purchased.filter((item) => item.id !== action.item.id);
      localStorage.setItem('purchased', JSON.stringify(purchased));
      return { ...state, purchased };
    }
    case actionsTypes.REMOVE_ALL_CART: {
      //Clone
      let purchased = [...state.purchased];
      //Edit
      purchased = [];
      localStorage.setItem('purchased', JSON.stringify(purchased));
      return { ...state, purchased };
    }
    case actionsTypes.SORT_VALUE: {
      let filter = action.filter;
      switch (action.value) {
        case 'lowest': {
          filter = filter.sort((a, b) => a.price - b.price);
          localStorage.setItem('sortValue', JSON.stringify(action.value));
          localStorage.setItem('filter', JSON.stringify(filter));
          return { ...state, filter, sortValue: action.value };
        }
        case 'highest': {
          filter = filter.sort((a, b) => b.price - a.price);
          localStorage.setItem('sortValue', JSON.stringify(action.value));
          localStorage.setItem('filter', JSON.stringify(filter));
          return { ...state, filter, sortValue: action.value };
        }
        case 'latest': {
          filter = filter.sort((a, b) => a.id - b.id);
          localStorage.setItem('sortValue', JSON.stringify(action.value));
          localStorage.setItem('filter', JSON.stringify(filter));
          return { ...state, filter, sortValue: action.value };
        }
        default:
          localStorage.setItem('sortValue', JSON.stringify(action.value));
          localStorage.setItem('filter', JSON.stringify(filter));
          return state;
      }
    }
    case actionsTypes.FILTER_VALUE: {
      let products = action.product;
      switch (action.value) {
        case 'all': {
          localStorage.setItem('filterValue', JSON.stringify(action.value));
          localStorage.setItem('filter', JSON.stringify(products));
          return { ...state, filter: products, filterValue: action.value };
        }
        default: {
          products = products.filter((p) => p.category === action.value);
          localStorage.setItem('filterValue', JSON.stringify(action.value));
          localStorage.setItem('filter', JSON.stringify(products));
          return { ...state, filter: products, filterValue: action.value };
        }
      }
    }
    case actionsTypes.RESET_CART: {
      //Clone
      let purchased = [...state.purchased];
      //Edit
      purchased = purchased.map((pur) => {
        pur.count = 1;
        return pur;
      });
      return { ...state, purchased };
    }
    case actionsTypes.ITEM_QUANTITY: {
      //Clone
      let purchased = [...state.purchased];
      let index = purchased.indexOf(action.item);
      purchased[index] = { ...purchased[index] };
      //Edit
      if (action.name === 'increase') {
        purchased[index].count++;
      } else if (action.name === 'decrease' && purchased[index].count > 0) {
        purchased[index].count--;
      }
      return { ...state, purchased };
    }
    case actionsTypes.DELETE_PRODUCT: {
      let products = state.products.filter((p) => p.id !== action.item.id);
      return { ...state, products, filter: products };
    }
    default:
      return state;
  }
};
// if (action.type === actionsTypes.FETCH_PRODUCTS_REQUEST) {
//   return { ...state, loading: true };
// } else if (action.type === actionsTypes.FETCH_PRODUCTS_SUCCESS) {
//   // localStorage.setItem('filter', JSON.stringify(action.items));
//   // localStorage.setItem('products', JSON.stringify(action.items));
//   return {
//     ...state,
//     loading: false,
//     products: action.items,
//     filter: action.items,
//     errors: '',
//   };
// } else if (action.type === actionsTypes.FETCH_PRODUCTS_FAILURE) {
//   return {
//     ...state,
//     loading: false,
//     products: [],
//     filter: [],
//     errors: action.errors,
//   };
// }
// if (action.type === actionsTypes.ADD_CART) {
//   //Clone
//   let purchased = [...state.purchased];
//   // Edit
//   let inCart = false;
//   purchased.forEach((item) => {
//     if (item.id === action.item.id) {
//       item.count++;
//       inCart = true;
//     }
//   });
//   if (!inCart) {
//     purchased.push({ ...action.item, count: 1 });
//   }
//   localStorage.setItem('purchased', JSON.stringify(purchased));
//   return { ...state, purchased };
// } else if (action.type === actionsTypes.REMOVE_CART) {
//   //Clone
//   let purchased = [...state.purchased];
//   //Edit
//   purchased = purchased.filter((item) => item.id !== action.item.id);
//   localStorage.setItem('purchased', JSON.stringify(purchased));
//   return { ...state, purchased };
// } else if (action.type === actionsTypes.REMOVE_ALL_CART) {
//   //Clone
//   let purchased = [...state.purchased];
//   //Edit
//   purchased = [];
//   localStorage.setItem('purchased', JSON.stringify(purchased));
//   return { ...state, purchased };
// }
// if (action.type === actionsTypes.SORT_VALUE) {
//   let filter = action.filter;
//   if (action.value === 'lowest') {
//     filter = filter.sort((a, b) => a.price - b.price);
//     return { ...state, filter, sortValue: action.value };
//   } else if (action.value === 'highest') {
//     filter = filter.sort((a, b) => b.price - a.price);
//     return { ...state, filter, sortValue: action.value };
//   } else {
//     filter = filter.sort((a, b) => a.id - b.id);
//     return { ...state, filter, sortValue: action.value };
//   }
// }
// if (action.type === actionsTypes.FILTER_VALUE) {
//   let products = action.product;
//   if (action.value === 'all') {
//     return { ...state, filter: products, filterValue: action.value };
//   } else {
//     let newProducts = products.filter((p) => p.category === action.value);
//     return { ...state, filter: newProducts, filterValue: action.value };
//   }
// }
// if (action.type === actionsTypes.RESET_CART) {
//   //Clone
//   let purchased = [...state.purchased];
//   //Edit
//   purchased = purchased.map((pur) => {
//     pur.count = 1;
//     return pur;
//   });
//   return {
//     ...state,
//     purchased,
//   };
// } else if (action.type === actionsTypes.ITEM_QUANTITY) {
//   //Clone
//   let purchased = [...state.purchased];
//   let index = purchased.indexOf(action.item);
//   purchased[index] = { ...purchased[index] };
//   //Edit
//   if (action.name === 'increase') {
//     purchased[index].count++;
//   } else if (action.name === 'decrease' && purchased[index].count > 0) {
//     purchased[index].count--;
//   }
//   return { ...state, purchased };
// }
//   if (action.type === actionsTypes.DELETE_PRODUCT) {
//     let products = state.products.filter((p) => p.id !== action.item.id);
//     return { ...state, products, filter: products };
//   } else {
//     return state;
//   }
// };
