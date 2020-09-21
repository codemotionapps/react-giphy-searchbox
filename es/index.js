import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import SearchForm from './components/SearchForm/SearchForm';
import ImageItem from './components/ImageItem/ImageItem';
import PoweredByGiphy from './components/PoweredByGiphy/PoweredByGiphy';
import MasonryLayout from './components/MasonryLayout/MasonryLayout';
import Alert from './components/Alert/Alert';
import Spinner from './components/Spinner/Spinner';
import useSearchForm from './hooks/useSearchForm';
import useDebounce from './hooks/useDebounce';
import useMedia from './hooks/useMedia';
import useApi from './hooks/useApi';
import assetsSpinner from './assets/spinner.svg';
import assetsPoweredByGiphy from './assets/poweredByGiphy.png';
import { getComponentWrapperWidth, getDefaultMasonryConfig, getMasonryConfigExceptLast, getMediaBreakpoints } from './utils/masonry';

var ReactGiphySearchBox = function ReactGiphySearchBox(_ref) {
  var apiKey = _ref.apiKey,
      gifListHeight = _ref.gifListHeight,
      gifPerPage = _ref.gifPerPage,
      imageBackgroundColor = _ref.imageBackgroundColor,
      library = _ref.library,
      listItemClassName = _ref.listItemClassName,
      listWrapperClassName = _ref.listWrapperClassName,
      loadingImage = _ref.loadingImage,
      masonryConfig = _ref.masonryConfig,
      messageError = _ref.messageError,
      messageLoading = _ref.messageLoading,
      messageNoMatches = _ref.messageNoMatches,
      onSearch = _ref.onSearch,
      onSelect = _ref.onSelect,
      poweredByGiphy = _ref.poweredByGiphy,
      poweredByGiphyImage = _ref.poweredByGiphyImage,
      rating = _ref.rating,
      searchFormClassName = _ref.searchFormClassName,
      searchPlaceholder = _ref.searchPlaceholder,
      wrapperClassName = _ref.wrapperClassName;

  var _useSearchForm = useSearchForm(),
      query = _useSearchForm.query,
      handleInputChange = _useSearchForm.handleInputChange,
      handleSubmit = _useSearchForm.handleSubmit;

  var debouncedQuery = useDebounce(query, 500);

  var apiEndpoint = query ? 'search' : 'trending';
  var apiUrl = function apiUrl(offset) {
    return 'https://api.giphy.com/v1/' + library + '/' + apiEndpoint + '?api_key=' + apiKey + '&limit=' + gifPerPage + '&rating=' + rating + '&offset=' + offset + '&q=' + query;
  };

  var _useApi = useApi(),
      _useApi$ = _useApi[0],
      data = _useApi$.data,
      loading = _useApi$.loading,
      error = _useApi$.error,
      lastPage = _useApi$.lastPage,
      fetchImages = _useApi[1];

  var masonryConfigMatchMedia = useMedia(getMediaBreakpoints(masonryConfig), getMasonryConfigExceptLast(masonryConfig), getDefaultMasonryConfig(masonryConfig));

  // Fetch Giphy Api on component mount and on search query change

  var _useState = useState(true),
      firstRun = _useState[0],
      setFirstRun = _useState[1];

  var isFirstRun = useRef(true);
  useEffect(function () {
    fetchImages(apiUrl(0));
  }, [library]);

  useEffect(function () {
    fetchImages(apiUrl(0));
    onSearch(query);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      setFirstRun(false);
    }
  }, [debouncedQuery]);

  function onScroll() {
    var scrollableDiv = document.querySelector('#scrollableDiv');
    if (!scrollableDiv) return;
    // console.log(
    //   scrollableDiv.scrollTop,
    //   scrollableDiv.clientHeight,
    //   scrollableDiv.scrollHeight,
    // )
    if (scrollableDiv.scrollTop + scrollableDiv.clientHeight >= scrollableDiv.scrollHeight) {
      // console.log('load more!')
      if (!loading && !lastPage) {
        fetchImages(apiUrl(data.length), true);
      }
    }
  }

  return React.createElement(
    'div',
    {
      className: '' + styles.componentWrapper + (wrapperClassName ? ' ' + wrapperClassName : ''),
      style: { width: getComponentWrapperWidth(masonryConfigMatchMedia) }
    },
    React.createElement(SearchForm, {
      value: query,
      setValue: handleInputChange,
      onSubmit: handleSubmit,
      loadingData: loading,
      searchFormClassName: searchFormClassName,
      placeholder: searchPlaceholder
    }),
    React.createElement(
      'div',
      {
        // eslint-disable-next-line no-return-assign
        id: 'scrollableDiv',
        onScroll: onScroll,
        className: '' + styles.listWrapper + (listWrapperClassName ? ' ' + listWrapperClassName : ''),
        style: { height: gifListHeight }
      },
      React.createElement(Alert, {
        show: data.length === 0 && !loading && !error && !firstRun,
        message: messageNoMatches
      }),
      React.createElement(Alert, { show: error, message: messageError }),
      React.createElement(Spinner, { show: loading, message: messageLoading, image: loadingImage }),
      data.length > 0 && React.createElement(
        MasonryLayout,
        { sizes: masonryConfig },
        data.map(function (item) {
          return React.createElement(ImageItem, {
            item: item,
            size: masonryConfigMatchMedia.imageWidth,
            key: item.id,
            listItemClassName: listItemClassName,
            onSelect: onSelect,
            backgroundColor: imageBackgroundColor
          });
        })
      )
    ),
    poweredByGiphy && React.createElement(PoweredByGiphy, { image: poweredByGiphyImage })
  );
};

ReactGiphySearchBox.defaultProps = {
  gifListHeight: '300px',
  gifPerPage: 20,
  imageBackgroundColor: '#eee',
  library: 'gifs',
  listItemClassName: '',
  listWrapperClassName: '',
  loadingImage: assetsSpinner,
  masonryConfig: [{ columns: 2, imageWidth: 120, gutter: 5 }],
  messageError: 'Oops! Something went wrong. Please, try again.',
  messageLoading: 'Loading...',
  messageNoMatches: 'No matches found.',
  onSearch: function onSearch() {},
  poweredByGiphy: true,
  poweredByGiphyImage: assetsPoweredByGiphy,
  rating: 'g',
  searchFormClassName: '',
  wrapperClassName: '',
  searchPlaceholder: 'Search for GIFs..'
};

export default ReactGiphySearchBox;