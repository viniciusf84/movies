import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Components
import LoadingContent from '../../components/DataDisplay/LoadingContent';

// service
import Services from '../../utils/services';

// Store
import store from '../../stores/SearchStore';


class Profile extends Component {
    
    state = {
        loading: false,
        movieId: undefined,
        data: {},
        message: undefined
    }    

    store = {store}
    

    componentDidMount() {
        const { match: { params } } = this.props;
 
        this.setState({
            movieId: params.movieId
        },
        () => this.getMovieData(this.state.movieId))
    }

    getMovieData = async id => {

        this.setState({
            loading: true
        })
        
        try { 
            const results = await Services.getData(id);

            if(results.data.Error) { // error
                this.setState({
                    loading: false,
                    data: {},
                    message: results.data.Error
                })
            } else { // success
                this.setState({
                    loading: false,
                    data: results.data,
                    message: undefined
                })
            }

        } catch(error) {
            this.setState({
                loading: false,
                message: error,
            }) 
        }
    }

   
    render() {
        const { data, loading,  data: { Title, Poster, Director, Actors, Genre, Plot, Website } , } = this.state;    

        return(
           
            <section className="movie-profile">
                
                <div className="wrapper container-fluid">
                    {this.state.message && 
                        <h3>{this.state.message}</h3>
                    }
                    <LoadingContent isLoading={loading} loadingText="Loading movie details" >
                        {Object.keys(data).length > 0 ?
                        <article className="details">
                            {store.search &&
                                <span className="small">You've searched for "{store.search}" </span>
                            }
                            <h1>{Title}</h1>

                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                                    <figure className="poster">
                                        {Poster === 'N/A' ?
                                            <FontAwesomeIcon icon={faFilm} size="10x" />
                                        :                                            
                                            <img src={Poster} alt={Title} />
                                        }
                                    </figure>
                                    <Link className="back" to="/" >Back to search</Link>
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
                                        {Website !== 'N/A' &&
                                        <p>
                                            Website: <strong><a href={Website} target="_blank" rel="noopener noreferrer">{Website}</a></strong>
                                        </p>
                                        }
                                        {Plot !== 'N/A' &&
                                        <p className="plot">
                                            Description: <br />
                                            {Plot}
                                        </p>
                                        }
                                    </div>

                                    
                                </div>
                            </div>
                        </article>
                        
                        :
                        <article className="details">
                            <Link className="back" to="/" >Back</Link>
                        </article>
                        }
                    </LoadingContent>
                </div>
            
            </section>
                   
            
        )
    }
}

export default Profile;