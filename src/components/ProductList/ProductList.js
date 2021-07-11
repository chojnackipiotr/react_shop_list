import React from 'react';
import PropTypes from 'prop-types';
import './ProductList.css';

import {List, ListItem} from '@material-ui/core';
import ProductListItem from './ProductListItem/ProductListItem';
import Alert from '../reusable/Alert/Alert';

const ProductList = ({productsInCart, addProduct, removeProduct, errorMessage}) => {
  const calculateTotal = () => {
    return productsInCart
      .reduce(( prev, current ) => {
        return prev + ( current.quantity * ( current.price * 1 ) );
      }, 0)
      .toFixed(2)
      .toString()
      .replace('.', ',');
  };

  return (
    <>
      <List component='ul'>
        {
          productsInCart.map(product => {
            return <ProductListItem
              key={ product.pid }
              product={ product }
              addProduct={ addProduct }
              removeProduct={ removeProduct }
            />;
          })
        }
        <ListItem
          className={ 'productList__totalInfo' }
        >
          Całkowita wartość zamówienia wynosi&nbsp;<b>{ calculateTotal() } zł</b>
        </ListItem>
      </List>
      {
        errorMessage &&
        <Alert
          message={ errorMessage }
          className={ 'productList__errorMessage' }
        />
      }
    </>
  );
};

ProductList.propTypes = {
  addProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  errorMessage: PropTypes.string,
  productsInCart: PropTypes.array,
};

export default ProductList;
