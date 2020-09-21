import React from 'react';
import styles from './PoweredByGiphy.module.css';

var PoweredByGiphy = function PoweredByGiphy(_ref) {
  var image = _ref.image;
  return React.createElement(
    'div',
    { className: styles.poweredByGiphy },
    React.createElement('img', { src: image, alt: 'Powered by Giphy', 'data-testid': 'PoweredByGiphy' })
  );
};

export default PoweredByGiphy;