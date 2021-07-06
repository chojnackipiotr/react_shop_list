import React, {useEffect, useReducer} from 'react';
import './App.css';

import {Container, Typography} from '@material-ui/core';
import ProductList from '../ProductList/ProductList';
import {getCartProducts} from '../../utils/api';

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
        dispatch({
          type: 'SET_CART_PRODUCTS',
          payload: {
            productsInCart: res,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: 'SET_MAIN_ERROR',
          payload: {
            mainErrorMessage: err,
          },
        });
      });
  }, []);

  return (
    <Container
      maxWidth='sm'
      className={ 'mainContainer' }
    >
      <Typography
        variant='h3'
        component='h3'>
        Lista produktów:
      </Typography>
      <ProductList
        productsInCart={ state.productsInCart }
        fetchingProducts={ state.fetchingProducts }
      />
    </Container>
  );
};

export {App};
