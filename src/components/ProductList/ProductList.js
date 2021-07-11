import React from 'react';
import PropTypes from 'prop-types';
import './ProductList.css';

import {List, ListItem} from '@material-ui/core';
import ProductListItem from './ProductListItem/ProductListItem';

const ProductList = props => {
  const calculateTotal = () => {
    return props.productsInCart
      .reduce((prev, current) => {
      return prev + (current.quantity * (current.price * 1))
    }, 0)
      .toFixed(2)
      .toString()
      .replace('.', ',')
  }
  
  return (
    <List component='ul'>
      {
        props.productsInCart.map(product => {
          return <ProductListItem
            key={product.pid}
            product={product}
            addProduct={props.addProduct}
            removeProduct={props.removeProduct}
          />;
        })
      }
      <ListItem
      className={'productList__totalInfo'}
      >
        Całkowita wartość zamówienia wynosi&nbsp;<b>{calculateTotal()} zł</b>
      </ListItem>
    </List>
  );
};

ProductList.propTypes = {
  productsInCart: PropTypes.array,
};

export default ProductList;
