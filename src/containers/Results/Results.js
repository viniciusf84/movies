import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Components
import LoadingContent from '../../components/DataDisplay/LoadingContent';

class Results extends Component {    

    goTo(id) {
        this.props.history.push(`/profile/${id}`)
    }

    render() {
        const { search, loading, movies, title, more, moreOnClick } = this.props;
        
        return(            
            <Fragment>
                
                <h4>{title}</h4>
                <section id="results" className='result-list'> 

                {movies && movies.length > 0 &&
                    movies.map(movie => 
                        <div className="result-list__item">
                            <Link to={`/profile/${movie.imdbID}`}>
                                <div className={movie.Poster === 'N/A' ? 'wrap icon__wrapper' : 'wrap  img__wrapper' } >
                                    {movie.Poster === 'N/A' ?
                                        <FontAwesomeIcon icon={faFilm} size="10x" />
                                    :                                            
                                        <img src={movie.Poster} alt={movie.Title} />
                                    }
                                </div>
                            </Link>
                            <div className="title">
                                <Link to={`/profile/${movie.imdbID}`}>
                                    <h5>{movie.Title}</h5>
                                </Link>
                            </div>
                        </div>
                    )
                }

                </section>
                
                {loading &&
                    <LoadingContent isLoading={loading} loadingText="Loading results" />
                }                                   
                
                {more &&
                    <button 
                        id="more"
                        className="load-more"
                        onClick={moreOnClick}
                    >
                        More movies...
                    </button>
                }
            </Fragment>
                        
        )
    }
}

export default Results;