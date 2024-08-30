import React, { createContext, useReducer } from 'react';

const SearchContext = createContext();

const initialState = {
  searchTerm: '',
  message: 'Use the search bar and find your favorite movie',
};

const types = {
  SET_EARCH_TERM: 'SET_SEARCH_TERM',
  SET_MESSAGE: 'SET_MESSAGE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_EARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.trim(),
      };

    case types.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};

const actions = (dispatch) => ({
  setSearchTerm: (item) =>
    dispatch({
      type: types.SET_EARCH_TERM,
      payload: item,
    }),

  setMessage: (item) =>
    dispatch({
      type: types.SET_MESSAGE,
      payload: item,
    }),
});

const SearchContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider
      value={{ ...state, dispatch, actions: actions(dispatch) }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
