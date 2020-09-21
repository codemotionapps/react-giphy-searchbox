// @flow
import React from 'react'
import styles from './SearchForm.module.css'

type Props = {
  onSubmit: Function,
  placeholder: string,
  searchFormClassName: string,
  setValue: Function,
  value: string,
}

const SearchForm = ({
  onSubmit,
  placeholder,
  searchFormClassName,
  setValue,
  value,
}: Props) => (
  <form
    data-testid="SearchFormForm"
    onSubmit={onSubmit}
    autoComplete="off"
    className={`${styles.form}${
      searchFormClassName ? ` ${searchFormClassName}` : ''
    }`}
  >
    <input
      data-testid="SearchFormInput"
      type="text"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      placeholder={placeholder}
      onChange={setValue}
      value={value}
      name="search"
      className={styles.input}
    />
  </form>
)

export default SearchForm
