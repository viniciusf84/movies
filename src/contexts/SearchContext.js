import React, { createContext, useReducer } from 'react';

const SearchContext = createContext();

const initialState = {
	search: '',
	data: [],
	page: null,
	updateList: true,
	displayMoreButton: false,
};

const types = {
	SEARCH_STRING: 'SEARCH_STRING',
	DATA: 'DATA',
	PAGE: 'PAGE',
	UPDATE_LIST: 'UPDATE_LIST',
};

const reducer = (state, action) => {
	switch (action.type) {
		case types.SEARCH_STRING:
			return {
				...state,
				search: action.payload.trim(),
			};

		case types.DATA:
			return {
				...state,
				data: action.payload,
			};

		case types.PAGE:
			return {
				...state,
				page: action.payload,
			};

		case types.UPDATE_LIST:
			return {
				...state,
				updateList: action.payload,
			};

		case types.MORE_BUTTON:
			return {
				...state,
				displayMoreButton: action.payload,
			};

		default:
			return {
				...state,
			};
	}
};

const actions = (dispatch) => ({
	setSearchString: (item) =>
		dispatch({
			type: types.SEARCH_STRING,
			payload: item,
		}),

	setSearchData: (item) => {
		dispatch({
			type: types.DATA,
			payload: item,
		});
	},

	setSearchPage: (item) =>
		dispatch({
			type: types.PAGE,
			payload: item,
		}),

	setDisplayMoreButton: (item) =>
		dispatch({
			type: types.MORE_BUTTON,
			payload: item,
		}),

	setUpdateList: (item) =>
		dispatch({
			type: types.UPDATE_LIST,
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
