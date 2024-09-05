import React, { useContext, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchContext } from '../../contexts/SearchContext';
import LoadingContent from '../../components/DataDisplay/LoadingContent';
import { getMovieData } from '../../utils/services';
import { format } from 'date-fns';

export default function Profile() {
  const { movieId } = useParams();
  const searchContext = useContext(SearchContext);

  const { data, error, isLoading } = useQuery({
    queryKey: ['movieData', movieId],
    queryFn: () => getMovieData(movieId),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    select: (data) => data,
  });

  const { title, poster_path, genres, release_date, overview, homepage } =
    data || {};

  const displayGenres = useCallback(() => {
    return (
      <ul>
        {genres?.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    );
  }, [genres]);

  return (
    <section className="movie-profile">
      <div className="wrapper container-fluid">
        {error && <h3>{error.message}</h3>}

        <LoadingContent
          isLoading={isLoading}
          loadingText="Loading movie details"
        >
          {data ? (
            <article className="details">
              {searchContext.search && (
                <span className="small">
                  You've searched for "{searchContext.search}"{' '}
                </span>
              )}

              <h1>{title}</h1>

              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                  <figure className="poster">
                    {poster_path === 'N/A' ? (
                      <FontAwesomeIcon
                        icon={faFilm}
                        size="10x"
                        alt="No poster available"
                      />
                    ) : (
                      <img
                        src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={`Poster of ${title}`}
                      />
                    )}
                  </figure>

                  <Link className="back" to="/">
                    Back to search
                  </Link>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <div className="text">
                    <dl>
                      <dt>Title:</dt>
                      <dd>{title}</dd>

                      <dt>Genres:</dt>
                      <dd>{displayGenres()}</dd>

                      <dt>Release date:</dt>
                      <dd>{format(new Date(release_date), 'MM/dd/yyyy')}</dd>

                      {homepage && (
                        <>
                          <dt>Website:</dt>
                          <dd>
                            <a
                              href={homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {homepage}
                            </a>
                          </dd>
                        </>
                      )}

                      {overview && (
                        <>
                          <dt>Description:</dt>
                          <dd className="plot">{overview}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <article className="details">
              <Link className="back" to="/">
                Back
              </Link>
            </article>
          )}
        </LoadingContent>
      </div>
    </section>
  );
}
