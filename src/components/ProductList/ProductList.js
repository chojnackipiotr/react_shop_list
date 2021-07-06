import React from 'react';
import PropTypes from 'prop-types';

import {CircularProgress, List, ListItem} from '@material-ui/core';

const ProductList = ({productsInCart, fetchingProducts}) => {
  const setListContent = () => {
    if (productsInCart.length === 0) {
      return 'Brak produktów'
    } else {
      return 'Lista'
    }
  }
  
  return (
    <>
    {
      fetchingProducts
      ?
      <CircularProgress />
      :
      setListContent()
    }
    </>
  );
};

ProductList.propTypes = {

};

export default ProductList;
