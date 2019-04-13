import React, { Component } from 'react';
import { faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

import Button from '../../components/General/Button';
import Icon from '../../components/General/Icon';

import Results from '../Results';

import Services from '../../utils/services';

class Search extends Component {
    
    state = {
        loading: false,
        search: '',
        count: 1,
        data: [],
        more: false,
        message: ''
    }    
    

    componentDidUpdate(prevProps, prevState) {
        if(prevState.search !== this.state.search) {
            this.setState({
                count: 1,
                data: []
            })
        }
    }

    onType = debounce((value) => {   
        
        if (!value) {
            this.setState({ 
                search: '',
                more: false 
            });
            
        } else {           
            this.setState({ 
                loading: true,             
                search: value,   
            },
            () => this.getResults()
            );
        }

    }, 600);

    getResults = async () => {    

        const results = await Services.search(this.state.search, this.state.count);        

        if(results.status === 200) {            

            // error
            if(results.data.Error) {
                this.setState({
                    loading: false,
                    data: [],
                    message: results.data.Error
                })
            } else {  // success                      
                this.setState(prevState => ({
                    loading: false,
                    data: prevState.search === this.state.search ? prevState.data.concat(results.data.Search) : results.data.Search,                    
                    message: 'Your search results: '                    
                })
                )                
            }

            // if there is more content to load
            if(parseInt(results.data.totalResults) > this.state.data.length) {
                this.setState(prevState => ({
                    more: true,
                    count: prevState.count + 1
                }))
            } else {
                this.setState({
                    more: false,                    
                })
            }

        } else {
            this.setState({
                loading: false, 
                search: '',
                data: [],
                message: 'Sorry... there is no result for your search',
                more: false,
                count: 1
            });
        }
    }

    onFormSubmit = e => e.preventDefault();

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
                                onChange={e => this.onType(e.target.value, this.state.count)}
                            />
                        </div>
                        
                    </form>
                    
                </section>

                <Results 
                    loading={this.state.loading}
                    search={this.state.search}
                    movies={this.state.data} 
                    title={this.state.message} 
                    more={this.state.more}
                    moreOnClick={() => this.onType(this.state.search, (this.state.count + 1))}
                /> 
            </React.Fragment>
        )
    }
}

export default Search;