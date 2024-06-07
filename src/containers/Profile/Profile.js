import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// hooks
import { SearchContext } from '../../contexts/SearchContext';

// Components
import LoadingContent from '../../components/DataDisplay/LoadingContent';

// service
import { getMovieData } from '../../utils/services';

export default function Profile() {
  const { movieId } = useParams();
  const searchContext = useContext(SearchContext);

  const { data, error, isLoading } = useQuery({
    queryKey: ['movieData', movieId],
    queryFn: () => getMovieData(movieId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    select: (data) => data?.data,
  });

  const { Title, Poster, Director, Actors, Genre, Year, Plot, Website } =
    data || {};

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

              <h1>{Title}</h1>

              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                  <figure className="poster">
                    {Poster === 'N/A' ? (
                      <FontAwesomeIcon icon={faFilm} size="10x" />
                    ) : (
                      <img src={Poster} alt={Title} />
                    )}
                  </figure>

                  <Link className="back" to="/">
                    Back to search
                  </Link>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <div className="text">
                    <p>
                      Title: <strong>{Title}</strong>
                    </p>
                    <p>
                      Director: <strong>{Director}</strong>
                    </p>
                    <p>
                      Actors: <strong>{Actors}</strong>
                    </p>
                    <p>
                      Genre: <strong>{Genre}</strong>
                    </p>
                    <p>
                      Year: <strong>{Year}</strong>
                    </p>
                    {Website !== 'N/A' && (
                      <p>
                        Website:{' '}
                        <strong>
                          <a
                            href={Website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {Website}
                          </a>
                        </strong>
                      </p>
                    )}
                    {Plot !== 'N/A' && (
                      <p className="plot">
                        Description: <br />
                        {Plot}
                      </p>
                    )}
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
