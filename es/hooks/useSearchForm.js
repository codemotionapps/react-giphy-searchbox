import { useState } from 'react';

var useSearchForm = function useSearchForm() {
  var _useState = useState(''),
      query = _useState[0],
      setInputs = _useState[1];

  var handleSubmit = function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
  };
  var handleInputChange = function handleInputChange(e) {
    e.persist();
    setInputs(e.target.value);
  };

  return {
    handleSubmit: handleSubmit,
    handleInputChange: handleInputChange,
    query: query
  };
};

export default useSearchForm;