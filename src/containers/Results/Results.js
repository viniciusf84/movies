import { useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchContext } from '../../contexts/SearchContext';
import { titleSearch } from '../../utils/services';
import LoadingContent from '../../components/DataDisplay/LoadingContent';
import Item from './Item';

function Results() {
  const searchContext = useContext(SearchContext);
  const { searchTerm, message, actions } = searchContext;
  const { setMessage } = actions;

  const fetchResults = async ({ pageParam = 1 }) => {
    const response = await titleSearch(searchTerm, pageParam);
    if (response?.data?.Response === 'False') {
      throw new Error(response?.data?.Error);
    }
    return {
      results: response?.data?.Search,
      nextPage: pageParam + 1,
      totalResults: parseInt(response?.data?.totalResults, 10),
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['searchResults', searchTerm],
      queryFn: fetchResults,
      enabled: !!searchTerm,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.nextPage * 10 < lastPage.totalResults) {
          return lastPage.nextPage;
        }
        return undefined;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      onSuccess: () => {
        setMessage(`Results for "${searchTerm}"`);
      },
      onError: (error) => {
        setMessage(error.message);
      },
    });

  const displayMovies = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="wrapper container-fluid">
      <h4>{message}</h4>

      <section id="results" className="result-list">
        <div className="row">
          {displayMovies.length > 0
            ? displayMovies.map((movie) => (
                <Item
                  key={movie.imdbID}
                  id={movie.imdbID}
                  image={movie.Poster}
                  title={movie.Title}
                />
              ))
            : !isFetching && <p>No results found.</p>}
        </div>
      </section>

      {isFetching && (
        <LoadingContent isLoading={isFetching} loadingText="Loading results" />
      )}

      {hasNextPage && (
        <button id="more" className="load-more" onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading more...' : '+ movies...'}
        </button>
      )}
    </div>
  );
}

export default Results;
