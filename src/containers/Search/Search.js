import React, { useContext, useCallback } from 'react';
import { debounce } from 'lodash';
import { SearchContext } from '../../contexts/SearchContext';

// components
import SearchInput from '../../components/General/SearchInput';

export default function Search() {
	const searchContext = useContext(SearchContext);
	const {
		setSearchString,
		setUpdateList,
    setMessage,
	} = searchContext.actions;

	const onHandleChange = useCallback(
		debounce((value) => {
			if (value.length > 3) {
				setUpdateList(true);
				setSearchString(value);
				setMessage('');
			}
		}, 600),
		[],
	);

	return (
		<section className="search-form">						
      <SearchInput
        name="movie-search-input"
        placeholder="Search for your favorite movie"
        onChange={(e) => onHandleChange(e.target.value)}
      />			
    </section>
	);
}
