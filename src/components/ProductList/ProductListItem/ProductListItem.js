import React from 'react';
import PropTypes from 'prop-types';
import './ProductListItem.css';

import {ListItem, IconButton} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const ProductListItem = ( {product, addProduct, removeProduct} ) => {
  const shouldBlockRemoveButton = product.isBlocked || product.quantity <= product.min;
  const shouldBlockAddButton = product.isBlocked || product.quantity >= product.max;

  const addProductToCart = () => {
    if ( shouldBlockAddButton ) return;

    addProduct(product.pid);
  };
  const removeProductFromCart = () => {
    if ( shouldBlockRemoveButton ) return;

    removeProduct(product.pid);
  };

  return (
    <ListItem className={ 'productListItem__wrapper' }>
      <div className={ 'productListItem__infoContainer' }>
        <span className={ 'productListItem__nameInfo' }>{ product.name }</span>
        <span className={ 'productListItem__priceInfo' }>
          cena: { product.price.replace('.', ',') } zł
        </span>
      </div>
      <div className={ 'productListItem__actionsContainer' }>
        <div className={ 'productListItem__buttonsContainer' }>
          <div tabIndex={ 0 } role='button' onClick={ removeProductFromCart }>
            <IconButton
              aria-label='delete'
              color={ 'secondary' }
              disabled={ shouldBlockRemoveButton }
            >
              <RemoveIcon />
            </IconButton>
          </div>
          <div tabIndex={ 0 } role='button' onClick={ addProductToCart }>
            <IconButton
              aria-label='add'
              color={ 'primary' }
              disabled={ shouldBlockAddButton }
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div>
          Obecnie masz <b>{ product.quantity } szt.</b> produktu
        </div>
      </div>
    </ListItem>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
  }),
};

export default ProductListItem;
