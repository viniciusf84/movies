import React, { useState, useEffect, useContext } from 'react';
import { debounce } from 'lodash';
import { SearchContext } from '../../contexts/SearchContext';

// components
import SearchInput from '../../components/General/SearchInput';

// containers
import Results from '../Results';

// service
import { titleSearch } from '../../utils/services';

export default function Search(props) {
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [totalResults, setTotalResults] = useState(null);
	const searchContext = useContext(SearchContext);
	const { data, search, page, updateList, displayMoreButton } = searchContext;
	const {
		setSearchData,
		setSearchString,
		setSearchPage,
		setUpdateList,
		setDisplayMoreButton,
	} = searchContext.actions;

	const onHandleChange = debounce((value) => {
		if (value.length > 3) {
			setUpdateList(true);
			setSearchString(value);
			setMessage('');
		}
	}, 600);

	function onMovieClick() {
		setUpdateList(true);
		setSearchPage(page + 1);
	}

	async function getResults(searchStr, pageNumber) {
		setLoading(true);

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

		setLoading(false);
	}

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
		if (data.length > 0 && totalResults) {
			setDisplayMoreButton(totalResults > data.length);
		}
	}, [data, totalResults]);

	return (
		<>
			<section className="search-form">
				<div className="wrapper container-fluid">
					<h2>{props.title}</h2>

					<SearchInput
						name="movie-search-input"
						placeholder="Type here..."
						onChange={(e) => onHandleChange(e.target.value)}
					/>
				</div>
			</section>

			<Results
				loading={loading}
				search={search}
				movies={data}
				title={message}
				more={displayMoreButton}
				onClickButton={() => onMovieClick()}
			/>
		</>
	);
}
