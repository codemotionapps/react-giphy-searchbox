import React from 'react';
import styles from './ImageItem.module.css';

var ImageItem = function ImageItem(_ref) {
  var backgroundColor = _ref.backgroundColor,
      item = _ref.item,
      size = _ref.size,
      listItemClassName = _ref.listItemClassName,
      onSelect = _ref.onSelect;
  return React.createElement(
    'button',
    {
      'data-testid': 'ImageItemButton',
      type: 'button',
      className: '' + styles.imageButton + (listItemClassName ? ' ' + listItemClassName : ''),
      style: {
        backgroundColor: backgroundColor,
        width: size + 'px',
        height: item.images.fixed_width_downsampled.height * size / item.images.fixed_width_downsampled.width + 'px'
      },
      onClick: function onClick() {
        return onSelect(item);
      }
    },
    React.createElement('img', {
      'data-testid': 'ImageItemImage',
      width: item.images.fixed_width_downsampled.width,
      height: item.images.fixed_width_downsampled.height,
      alt: item.title,
      src: item.images.fixed_width_downsampled.url,
      className: styles.image
    })
  );
};

export default ImageItem;