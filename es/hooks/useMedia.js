import { useEffect, useState } from 'react';

export default function useMedia(queries, values, defaultValue) {
  var mediaQueryLists = queries.map(function (q) {
    return window.matchMedia(q);
  });

  var getValue = function getValue() {
    // Get index of first media query that matches
    var index = mediaQueryLists.findIndex(function (mql) {
      return mql.matches;
    });
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  // State and setter for matched value

  var _useState = useState(getValue),
      value = _useState[0],
      setValue = _useState[1];

  useEffect(function () {
    var handler = function handler() {
      return setValue(getValue);
    };

    // Set a listener for each media query with above handler as callback.
    mediaQueryLists.forEach(function (mql) {
      return mql.addListener(handler);
    });

    // Remove listeners on cleanup
    return function () {
      return mediaQueryLists.forEach(function (mql) {
        return mql.removeListener(handler);
      });
    };
  }, []);

  return value;
}