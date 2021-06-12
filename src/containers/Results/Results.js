import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';

// hooks
import { SearchContext } from '../../contexts/SearchContext';

// service
import { titleSearch } from '../../utils/services';

// components
import LoadingContent from '../../components/DataDisplay/LoadingContent';
import Item from './Item';

function Results() {
  const [results, setResults] = useState([]);
	const [totalResults, setTotalResults] = useState(null);

  const searchContext = useContext(SearchContext);
  const { 
    isLoading, 
    data, 
    search, 
    page, 
    message, 
    updateList, 
    displayMoreButton 
  } = searchContext;
  const {
    setIsLoading,
		setSearchData,
		setSearchString,
		setSearchPage,
		setUpdateList,
		setDisplayMoreButton,
    setMessage,
	} = searchContext.actions;

  const onMovieClick = useCallback(() => {
		setUpdateList(true);
		setSearchPage(page + 1);
	}, [page]);

  const getResults = useCallback(async (searchStr, pageNumber) => {
		setIsLoading(true);

		try {
			const response = await titleSearch(searchStr, pageNumber);

			if (response.data.Response === 'False') {
				// error
				setResults([]);
				setMessage(response.data.Error);
			} else {
				// success
				setResults(response.data.Search);
				setMessage(`Results for "${searchStr}"`);
				setTotalResults(parseInt(response.data.totalResults));
			}
		} catch (error) {
			setMessage(error);
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (data && data.length > 0) {
			// brings data from context

			setMessage(`Results for "${search}"`);
		} else {
			setSearchString('Batman');
		}
	}, []);

	useEffect(() => {
		if (search === '') {
			setMessage('');
		}

		if (search.length > 0 && updateList) {
			setSearchData([]);
			setMessage('Loading');

			if (page === 1) {
				getResults(search, 1);
			} else {
				setSearchPage(1);
			}
		}
	}, [search]);

	useEffect(() => {
		if (page && updateList) {
			getResults(search, page);
		}
	}, [page]);

	useEffect(() => {
		if (results.length > 0) {
			if (page === 1) {
				setSearchData(results);
			} else {
				setSearchData([...data, ...results]);
			}
		}
	}, [results]);

	useEffect(() => {
		if (data && data.length > 0 && totalResults) {
			setDisplayMoreButton(totalResults > data.length);
		}
	}, [data, totalResults]);

  const displayMovies = useMemo(() => (
    data &&
    data.length > 0 &&
    data.map((movie) => (
      <Item
        key={movie.imdbID}
        id={movie.imdbID}
        image={movie.Poster}
        title={movie.Title}
      />
    ))
  ), [data])

	return (
		<div className="wrapper container-fluid">
			<h4>{message}</h4>

			<section id="results" className="result-list">
				<div className="row">
					{displayMovies}
				</div>
			</section>

			{isLoading && (
				<LoadingContent isLoading={isLoading} loadingText="Loading results" />
			)}

			{displayMoreButton && (
				<button id="more" className="load-more" onClick={onMovieClick}>
					+ movies...
				</button>
			)}
		</div>
	);
}

export default Results;
