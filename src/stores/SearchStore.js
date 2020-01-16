import React, { createContext, useReducer } from "react";

const SearchContext = createContext();

const initialState = {
  search: "",
  data: [],
  count: 1,
  more: false
};

const types = {
  SEARCH_STRING: "SEARCH_STRING",
  DATA: "DATA",
  COUNT: "COUNT",
  MORE: "MORE"
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.SEARCH_STRING:
      return {
        ...state,
        search: action.payload.trim()
      };

    case types.DATA:
      return {
        ...state,
        data: action.payload
      };

    case types.COUNT:
      return {
        ...state,
        count: action.payload
      };

    case types.MORE:
      return {
        ...state,
        more: action.payload
      };

    default:
      return {
        ...state
      };
  }
};

const actions = dispatch => ({
  setSearchString: item =>
    dispatch({
      type: types.SEARCH_STRING,
      payload: item
    }),
  setSearchData: item => {
    dispatch({
      type: types.DATA,
      payload: item
    });
  },
  setSearchPage: item =>
    dispatch({
      type: types.COUNT,
      payload: item
    }),
  setMoreButton: item =>
    dispatch({
      type: types.MORE,
      payload: item
    })
});

const SearchContextProvider = props => {
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
