import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// service
import Services from '../../utils/services';


class Profile extends Component {
    
    state = {
       movieId: undefined,
       data: {},
       message: undefined
    }    
    

    componentDidMount() {
        const { match: { params } } = this.props;
 
        this.setState({
            movieId: params.movieId
        },
        () => this.getMovieData(this.state.movieId))
    }

    getMovieData = async id => {
        const results = await Services.getData(id);

        if(results.status === 200) { 

            if(results.data.Error) { // error
                this.setState({
                    data: {},
                    message: results.data.Error
                })
            } else { // success
                this.setState({
                    data: results.data,
                    message: undefined
                })
            }

        } else {
            this.setState({
                movieId: undefined,
                data: {},
                message: undefined
            }) 
        }
    }

   
    render() {
        const { data,  data: { Title, Poster, Director, Actors, Genre, Plot, Website } } = this.state;    

        return(
           
            <section className='movie-profile'>
                
                <div className='wrapper'>
                    {this.state.message && 
                        <h3>{this.state.message}</h3>
                    }
                    
                    {data &&
                    <article className="details">
                        <h1>{Title}</h1>

                        <div className="row">
                            <div className="coll-xs-12 col-sm-8 col-md-6 col-lg-4">
                                <figure className="poster">
                                    {Poster === 'N/A' ?
                                        <FontAwesomeIcon icon={faFilm} size="10x" />
                                    :                                            
                                        <img src={Poster} alt={Title} />
                                    }
                                </figure>
                                <Link to="/" >Back</Link>
                            </div>

                            <div className="coll-xs-12 col-sm-4 col-md-6 col-lg-6">
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
                                        {Plot}
                                    </p>
                                    }
                                </div>

                                
                            </div>
                        </div>
                    </article>
                    }
                </div>
            
            </section>
                   
            
        )
    }
}

export default Profile;