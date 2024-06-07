import React, { useContext } from 'react';
import { debounce } from 'lodash';
import { SearchContext } from '../../contexts/SearchContext';

// components
import SearchInput from '../../components/General/SearchInput';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAtHome = location.pathname === '/';

  const searchContext = useContext(SearchContext);
  const { setSearchString } = searchContext.actions;

  const onHandleChange = debounce((value) => {
    if (value.length > 3) {
      setSearchString(value);

      if (!isAtHome) {
        navigate('/');
      }
    }
  }, 600);

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
