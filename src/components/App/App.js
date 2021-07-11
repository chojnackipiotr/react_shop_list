import React, {useCallback, useEffect, useReducer} from 'react';
import './App.css';

import debounce from '../../utils/debounce';

import Alert from '../reusable/Alert/Alert';
import {CircularProgress, Container, Typography} from '@material-ui/core';
import ProductList from '../ProductList/ProductList';
import {checkProduct, getCartProducts} from '../../utils/api';

const initialState = {
  fetchingProducts: true,
  productsInCart: [],
  mainErrorMessage: '',
  errorMessage: '',
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
      };
    case 'SET_MAIN_ERROR':
      return {
        ...state,
        fetchingProducts: false,
        mainErrorMessage: action.payload.mainErrorMessage,
      };
    case 'SET_ERROR':
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debounceFetch = useCallback(debounce(correctQuantity, 500), []);

  useEffect(() => {
    getCartProducts()
      .then(res => {
        const products = res.map(product => {
          return {
            ...product,
            quantity: product.min,
          };
        });
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

  function correctQuantity( pid, quantity, productsInCart ) {
    checkProduct(pid, quantity)
      .then(res => {
        if ( res.isError && res.errorType === 'INCORRECT_QUANTITY' ) {
          console.log(productsInCart);
          const updatedProductList = productsInCart.map(product => {
            if ( product.pid === pid ) {
              return {
                ...product,
                quantity: product.min,
              };
            } else {
              return product;
            }
          });

          dispatch({
            type: 'UPDATE_CART_PRODUCTS',
            payload: {
              productsInCart: updatedProductList,
            },
          });

          dispatch({
            type: 'SET_ERROR',
            payload: {
              errorMessage: res.message,
            },
          });
        } else if ( res.isError ) {
          throw new Error(res.message);
        }
      }).catch(err => {
      dispatch({
        type: 'SET_ERROR',
        payload: {
          errorMessage: err.message,
        },
      });
    });
  }

  const clearError = () => {
    dispatch({
      type: 'SET_ERROR',
      payload: {
        errorMessage: '',
      },
    });
  };

  const addProduct = async ( pid ) => {
    if ( state.errorMessage ) clearError();

    let quantity;

    const updatedProductList = state.productsInCart.map(product => {
      if ( product.pid === pid ) {
        quantity = product.quantity + 1;
        return {
          ...product,
          quantity,
        };
      } else {
        return product;
      }
    });

    dispatch({
      type: 'UPDATE_CART_PRODUCTS',
      payload: {
        productsInCart: updatedProductList,
      },
    });

    debounceFetch(pid, quantity, state.productsInCart);
  };

  const removeProduct = ( pid ) => {
    if ( state.errorMessage ) clearError();

    let quantity;
    const updatedProductList = state.productsInCart.map(product => {
      if ( product.pid === pid ) {
        quantity = product.quantity - 1;
        return {
          ...product,
          quantity,
        };
      } else {
        return product;
      }
    });

    dispatch({
      type: 'UPDATE_CART_PRODUCTS',
      payload: {
        productsInCart: updatedProductList,
      },
    });

    debounceFetch(pid, quantity, state.productsInCart);
  };

  const getContent = () => {
    return state.mainErrorMessage
           ?
           <Alert message={ state.mainErrorMessage } className='mainError' />
           :
           <ProductList
             productsInCart={ state.productsInCart }
             fetchingProducts={ state.fetchingProducts }
             errorMessage={ state.errorMessage }
             addProduct={ addProduct }
             removeProduct={ removeProduct }
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
