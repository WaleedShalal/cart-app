import * as actionsTypes from './shoppingCartTypes';
import axios from 'axios';
// START ACTIONS FOR FETCHED DATA
export const fetchProductsRequest = () => {
  return {
    type: actionsTypes.FETCH_PRODUCTS_REQUEST,
  };
};

export const fetchProductsSuccess = (items) => {
  return {
    type: actionsTypes.FETCH_PRODUCTS_SUCCESS,
    items,
  };
};

export const fetchProductsFailure = (errors) => {
  return {
    type: actionsTypes.FETCH_PRODUCTS_FAILURE,
    errors,
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsRequest());
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        const items = res.data;
        items.forEach((item) => {
          item.count = 0;
        });
        localStorage.getItem('products')
          ? JSON.parse(localStorage.getItem('products'))
          : dispatch(fetchProductsSuccess(items));
      })
      .catch((error) => {
        const errors = error.message;
        dispatch(fetchProductsFailure(errors));
      });
  };
};
// END ACTIONS FOR FETCHED DATA

// START ACTIONS FOR ADD & REMOVE CART
export const addCart = (item) => {
  return {
    type: actionsTypes.ADD_CART,
    item,
  };
};

export const removeCart = (item) => {
  return {
    type: actionsTypes.REMOVE_CART,
    item,
  };
};

export const removeAllCart = () => {
  return {
    type: actionsTypes.REMOVE_ALL_CART,
  };
};
// END ACTIONS FOR ADD & REMOVE CART

// START ACTIONS FOR SORT AND FILTER
export const showSortAndFilter = (e, allProduct, allFilter) => {
  return {
    type:
      e.currentTarget.name === actionsTypes.SORT_VALUE
        ? actionsTypes.SORT_VALUE
        : actionsTypes.FILTER_VALUE,
    product: allProduct,
    filter: allFilter,
    name: e.currentTarget.name,
    value: e.currentTarget.value,
  };
};
// END ACTIONS FOR SORT AND FILTER

// START ACTIONS FOR CART COMPONENT
export const resetCart = () => {
  return {
    type: actionsTypes.RESET_CART,
  };
};

export const itemQuantity = (e, item) => {
  return {
    type: actionsTypes.ITEM_QUANTITY,
    item,
    name: e.target.name,
  };
};
// END ACTIONS FOR CART COMPONENT
export const adminAddProduct = (newProduct) => {
  return {
    type: actionsTypes.ADD_PRODUCT,
    newProduct,
  };
};

export const adminAddAction = (newProduct) => {
  return (dispatch) => {
    axios.post('https://fakestoreapi.com/products/', newProduct).then(() => {
      dispatch(adminAddProduct(newProduct));
    });
  };
};

export const adminEditProduct = (itemId, editedItem) => {
  return {
    type: actionsTypes.EDIT_PRODUCT,
    itemId,
    editedItem,
  };
};

export const adminEditAction = (itemId, oldItem) => {
  return (dispatch) => {
    axios
      .put('https://fakestoreapi.com/products/' + itemId, oldItem)
      .then((res) => {
        const editedItem = { ...res.data, id: itemId };
        dispatch(adminEditProduct(itemId, editedItem));
      });
  };
};

export const adminDeleteProduct = (item) => {
  return {
    type: actionsTypes.DELETE_PRODUCT,
    item,
  };
};

export const adminDeleteAction = (item) => {
  return (dispatch) => {
    axios.delete('https://fakestoreapi.com/products/' + item.id).then((res) => {
      dispatch(adminDeleteProduct(item));
    });
  };
};

export const fetchDefaultProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsRequest());
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        const items = res.data;
        items.forEach((item) => {
          item.count = 0;
        });
        dispatch(fetchProductsSuccess(items));
      })
      .catch((error) => {
        const errors = error.message;
        dispatch(fetchProductsFailure(errors));
      });
  };
};

// // END ACTIONS FOR ADMIN COMPONENT
