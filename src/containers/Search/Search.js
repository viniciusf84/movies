import React, { Component } from 'react';
import { faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

import Button from '../../components/General/Button';
import Icon from '../../components/General/Icon';

import Results from '../Results';

import Services from '../../utils/services';

class Search extends Component {

    state = {
        search: '',
        data: {}
    }    

    onType = debounce((value) => {        

        if (!value) {
            this.setState({ 
                search: {} 
            });
            
        } else {           
            this.setState({ 
                search: value,                 
            },
            () => this.getResults()
            );
        }

    }, 600);

    getResults = async () => {       

        const results = await Services.search(this.state.search);

        if(results.status === 200) {
            if(results.data.Response) {
                this.setState({
                    data: results.data.Search
                })
            }
        }
    }

    render() {
        return(
            <React.Fragment>
                <section className='search-form'>
                <h2>{this.props.title}</h2>
                    
                    <form 
                        id="movies-search" 
                        onSubmit={e => this.onFormSubmit(e)}
                    >
                        
                        <div className='form-group'>
                            <input
                                type="text"                                   
                                className='form-control'
                                name='movie-search-input'
                                placeholder="Type here..."
                                onChange={e => this.onType(e.target.value)}
                            />
                        </div>
                        
                    </form>
                    
                </section>

                <Results 
                    movies={this.state.data} 
                    title="Your search results:" 
                /> 
            </React.Fragment>
        )
    }
}

export default Search;