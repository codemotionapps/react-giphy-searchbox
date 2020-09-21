import React from 'react';
import styles from './Spinner.module.css';

var Spinner = function Spinner(_ref) {
  var show = _ref.show,
      message = _ref.message,
      image = _ref.image;
  return show && React.createElement(
    'div',
    { role: 'status', className: styles.spinnerWrapper },
    React.createElement('div', {
      className: styles.spinner,
      style: { backgroundImage: 'url(' + image + ')' },
      'data-testid': 'Spinner'
    }),
    React.createElement(
      'div',
      { className: styles.spinnerText, 'data-testid': 'SpinnerText' },
      message
    )
  );
};

export default Spinner;