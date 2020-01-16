import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { SearchContext } from "../../stores/SearchStore";
// Components
import LoadingContent from "../../components/DataDisplay/LoadingContent";

// service
import { getData } from "../../utils/services";

export default function Profile(props) {
  const [isLoading, setIsLoading] = useState(0);
  const [data, setData] = useState({});
  const [message, setMessage] = useState(undefined);
  const store = useContext(SearchContext);
  const { Title, Poster, Director, Actors, Genre, Plot, Website } = data;

  useEffect(() => {
    const {
      match: { params }
    } = props;

    async function getMovieData(e) {
      setIsLoading(true);

      try {
        const results = await getData(e);

        if (results.data.Error) {
          // error
          setIsLoading(true);
          setData({});
          setMessage(results.data.Error);
        } else {
          // success
          setIsLoading(false);
          setData(results.data);
          setMessage(undefined);
        }
      } catch (error) {
        setIsLoading(false);
        setMessage(error);
      }
    }

    getMovieData(params.movieId);
  }, {});

  return (
    <section className="movie-profile">
      <div className="wrapper container-fluid">
        {message && <h3>{message}</h3>}
        <LoadingContent
          isLoading={isLoading}
          loadingText="Loading movie details"
        >
          {Object.keys(data).length > 0 ? (
            <article className="details">
              {store.search && (
                <span className="small">
                  You've searched for "{store.search}"{" "}
                </span>
              )}
              <h1>{Title}</h1>

              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                  <figure className="poster">
                    {Poster === "N/A" ? (
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
                    {Website !== "N/A" && (
                      <p>
                        Website:{" "}
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
                    {Plot !== "N/A" && (
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
