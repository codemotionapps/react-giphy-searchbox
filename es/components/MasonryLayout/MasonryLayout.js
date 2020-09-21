/* eslint-disable import/no-duplicates */
import * as React from 'react';
import { useRef, useEffect, Children } from 'react';
import Bricks from 'bricks.js';

var MasonryLayout = function MasonryLayout(_ref) {
  var children = _ref.children,
      sizes = _ref.sizes;

  var container = useRef(null);

  useEffect(function () {
    var bricks = Bricks({
      container: container.current,
      packed: 'data-packed',
      sizes: sizes,
      position: true
    });

    bricks.resize(true);

    if (Children.count(children) > 0) {
      bricks.pack();
    }
  }, [children]);

  return React.createElement(
    'div',
    { ref: container, 'data-testid': 'MasonryLayoutContainer' },
    children
  );
};

export default MasonryLayout;