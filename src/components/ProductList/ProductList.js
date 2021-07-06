import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem} from '@material-ui/core';

const ProductList = props => {
  return (
    <List component="ul">
      <ListItem>Patelnia, cena: 89,99zł</ListItem>
    </List>
  );
};

ProductList.propTypes = {

};

export default ProductList;
