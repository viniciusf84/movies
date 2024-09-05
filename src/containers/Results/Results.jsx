import { useContext, useMemo, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchContext } from '../../contexts/SearchContext';
import { getTitleSearch } from '../../utils/services';
import LoadingContent from '../../components/DataDisplay/LoadingContent';
import SearchItem from '../../components/DataDisplay/SearchItem';

function Results() {
  const { searchTerm, message, actions } = useContext(SearchContext);
  const { setMessage } = actions;

  const fetchResults = async ({ pageParam = 1 }) => {
    const response = await getTitleSearch(searchTerm, pageParam);
    if (response?.data?.Response === 'False') {
      throw new Error(response?.data?.Error);
    }

    return {
      results: response.results,
      nextPage: response.page + 1,
      totalResults: response?.total_results,
      pages: response?.total_pages,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['searchResults', searchTerm],
      queryFn: fetchResults,
      enabled: !!searchTerm,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage <= lastPage.pages
          ? lastPage.nextPage
          : undefined;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      onSuccess: () => {
        setMessage(`Results for "${searchTerm}"`);
      },
      onError: (error) => {
        setMessage(error.message);
      },
      retry: false,
    });

  const displayMovies = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data?.pages]);

  const displayNoResults = useCallback(() => {
    if (isFetching || !searchTerm) {
      return null;
    }

    return (
      <div className="col-xs-12">
        <p>No results found for "{searchTerm}".</p>
      </div>
    );
  }, [isFetching, searchTerm]);

  return (
    <div className="wrapper container-fluid">
      <h4>{message}</h4>

      <section id="results" className="result-list">
        <div className="row">
          {displayMovies.length > 0
            ? displayMovies.map((movie) => {
                return (
                  <SearchItem
                    key={movie.id}
                    id={movie.id}
                    image={
                      movie.poster_path
                        ? `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : null
                    }
                    title={movie.title}
                  />
                );
              })
            : displayNoResults()}
        </div>
      </section>

      {isFetching && (
        <LoadingContent isLoading={isFetching} loadingText="Loading results" />
      )}

      {hasNextPage && (
        <button id="more" className="load-more" onClick={fetchNextPage}>
          {isFetchingNextPage ? 'Loading more...' : '+ movies...'}
        </button>
      )}
    </div>
  );
}

export default Results;
