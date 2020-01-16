import React, { Component } from "react";

// Components
import LoadingContent from "../../components/DataDisplay/LoadingContent";
import Item from "./Item";

class Results extends Component {
  goTo(id) {
    this.props.history.push(`/profile/${id}`);
  }

  render() {
    const { loading, movies, title, more, onClickButton } = this.props;

    return (
      <div className="wrapper container-fluid">
        <h4>{title}</h4>
        <section id="results" className="result-list">
          <div className="row">
            {movies &&
              movies.length > 0 &&
              movies.map(movie => (
                <Item
                  key={movie.imdbID}
                  id={movie.imdbID}
                  image={movie.Poster}
                  title={movie.Title}
                />
              ))}
          </div>
        </section>

        {loading && (
          <LoadingContent isLoading={loading} loadingText="Loading results" />
        )}

        {more && (
          <button id="more" className="load-more" onClick={onClickButton}>
            + movies...
          </button>
        )}
      </div>
    );
  }
}

export default Results;
