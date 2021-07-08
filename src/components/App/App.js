import React, {useEffect, useReducer} from 'react';
import './App.css';

import Alert from '../reusable/Alert/Alert';
import {CircularProgress, Container, Typography} from '@material-ui/core';
import ProductList from '../ProductList/ProductList';
import {checkProduct, getCartProducts} from '../../utils/api';

const initialState = {
  fetchingProducts: true,
  productsInCart: [],
  mainErrorMessage: '',
};

function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case 'SET_CART_PRODUCTS':
      return {
        ...state,
        productsInCart: action.payload.productsInCart,
        fetchingProducts: false,
      };
    case 'UPDATE_CART_PRODUCTS':
      return {
        ...state,
        productsInCart: action.payload.productsInCart,
      }
    case 'SET_MAIN_ERROR':
      return {
        ...state,
        fetchingProducts: false,
        mainErrorMessage: action.payload.mainErrorMessage,
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCartProducts()
      .then(res => {
        const products = res.map(product => {
          return {
            ...product,
            quantity: product.min
          }
        })
        dispatch({
          type: 'SET_CART_PRODUCTS',
          payload: {
            productsInCart: products,
          },
        });
      })
      .catch(( err ) => {
        dispatch({
          type: 'SET_MAIN_ERROR',
          payload: {
            mainErrorMessage: err.message,
          },
        });
      });
  }, []);

  const addProduct = (pid) => {
    const updatedProductList = state.productsInCart.map(product => {
      if (product.pid === pid) {
        return {
          ...product,
          quantity: product.quantity + 1
        }
      } else {
        return product
      }
    });

    dispatch({
      type: 'UPDATE_CART_PRODUCTS',
      payload: {
        productsInCart: updatedProductList,
      }
    })
  }

  const removeProduct = (pid) => {
    const updatedProductList = state.productsInCart.map(product => {
      if (product.pid === pid) {
        return {
          ...product,
          quantity: product.quantity - 1
        }
      } else {
        return product
      }
    });

    dispatch({
      type: 'UPDATE_CART_PRODUCTS',
      payload: {
        productsInCart: updatedProductList,
      }
    })
  }

  const getContent = () => {
    return state.mainErrorMessage
           ?
           <Alert message={state.mainErrorMessage} className='mainError'/>
           :
           <ProductList
             productsInCart={ state.productsInCart }
             fetchingProducts={ state.fetchingProducts }
             addProduct={addProduct}
             removeProduct={removeProduct}
           />;
  };

  return (
    <Container
      maxWidth='lg'
      className={ 'mainContainer' }
    >
      <Typography
        variant='h3'
        component='h3'>
        Lista produktów:
      </Typography>
      {
        state.fetchingProducts
        ?
        <CircularProgress />
        :
        getContent()
      }
    </Container>
  );
};

export {App};
