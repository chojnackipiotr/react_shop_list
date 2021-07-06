import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem} from '@material-ui/core';

const ProductList = props => {
  return (
    <List component='ul'>
      {
        props.productsInCart.map(product => {
          return <ListItem key={ product.pid }>{ product.name }, cena: { product.price }</ListItem>;
        })
      }
    </List>
  );
};

ProductList.propTypes = {};

export default ProductList;
