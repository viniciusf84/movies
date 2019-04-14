import React, { Component } from 'react';
import { debounce } from 'lodash';

// components
import SearchInput from '../../components/General/SearchInput';

// containers
import Results from '../Results';

// service
import Services from '../../utils/services';


class Search extends Component {
    
    state = {
        loading: false,
        search: '',
        count: 1,
        data: [],
        more: false,
        message: '',
    }    

    componentDidMount() {       
        
        this.setState({
            search: 'Batman'
        },
        () => this.getResults(Services.titleSearch, this.state.search, this.state.count)
        )
    }
    

    componentDidUpdate(prevProps, prevState) {
        if(prevState.search !== this.state.search) {
            this.setState({
                count: 1,
                data: [],
                message: 'Loading'
            })
            if(this.state.search === '') {
                this.setState({
                    message: ''
                })
            }
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
            () => this.getResults(Services.titleSearch, this.state.search, this.state.count)
            );
        }

    }, 600);

    getResults = async (func, search, count) => {    

        const results = await func(search, count);        

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
                    message: `Results for '${this.state.search}'`                    
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

    render() {
        return(
            <React.Fragment>
                <section className='search-form'>

                    <h2>{this.props.title}</h2>
                    
                    <SearchInput                               
                        name='movie-search-input'
                        placeholder="Type here..."
                        onChange={e => this.onType(e.target.value, this.state.count)}
                    />              

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