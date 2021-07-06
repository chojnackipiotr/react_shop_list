import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';

const Alert = ({message, className}) => {
  return (
    <Typography
      className={className}
      variant='subtitle1'
    >
      {message}
    </Typography>
  );
};

Alert.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
};

export default Alert;
