import React from 'react';
import styles from './SearchForm.module.css';

var SearchForm = function SearchForm(_ref) {
  var onSubmit = _ref.onSubmit,
      placeholder = _ref.placeholder,
      searchFormClassName = _ref.searchFormClassName,
      setValue = _ref.setValue,
      value = _ref.value;
  return React.createElement(
    'form',
    {
      'data-testid': 'SearchFormForm',
      onSubmit: onSubmit,
      autoComplete: 'off',
      className: '' + styles.form + (searchFormClassName ? ' ' + searchFormClassName : '')
    },
    React.createElement('input', {
      'data-testid': 'SearchFormInput',
      type: 'text'
      // eslint-disable-next-line jsx-a11y/no-autofocus
      , autoFocus: true,
      placeholder: placeholder,
      onChange: setValue,
      value: value,
      name: 'search',
      className: styles.input
    })
  );
};

export default SearchForm;