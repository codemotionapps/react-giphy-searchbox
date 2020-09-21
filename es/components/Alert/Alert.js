import React from 'react';
import styles from './Alert.module.css';

var Alert = function Alert(_ref) {
  var show = _ref.show,
      message = _ref.message;
  return show && React.createElement(
    'p',
    { role: 'alert', 'data-testid': 'Alert', className: styles.message },
    message
  );
};

export default Alert;