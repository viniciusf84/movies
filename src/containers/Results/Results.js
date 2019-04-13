import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

import LoadingContent from '../../components/DataDisplay/LoadingContent';
import Services from '../../utils/services';

class Results extends Component {    

    render() {
        const { search, loading, movies, title, more, moreOnClick } = this.props;
        
        return(            
            <Fragment>
                
                <h4>{title}</h4>
                <section id="results" className='result-list'> 

                {search && movies && movies.length > 0 &&
                    movies.map(e => 
                        <div className="result-list__item">
                            <div className={e.Poster === 'N/A' ? 'wrapper icon__wrapper' : 'wrapper  img__wrapper' } >
                                {e.Poster === 'N/A' ?
                                    <FontAwesomeIcon icon={faFilm} size="10x" />
                                :                                            
                                    <img src={e.Poster} alt={e.Title} />
                                }
                            </div>
                            <div className="title">
                                <h5>{e.Title}</h5>
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
                        Find more...
                    </button>
                }
            </Fragment>
                        
        )
    }
}

export default Results;