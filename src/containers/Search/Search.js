import React, { Component } from 'react';
import { debounce } from 'lodash';
import { observer } from 'mobx-react';

// components
import SearchInput from '../../components/General/SearchInput';

// containers
import Results from '../Results';

// service
import Services from '../../utils/services';


const SearchObs = observer(class Search extends Component {
    
    state = {
        loading: false,
        search: '',
        data: [],
        count: 1,
        more: false,
        message: '',
        hasData: false
    }    

    componentDidMount() { 
        
        const { store } = this.props;
        
        if(store.data.length > 0) { // brings data from store
            console.log('mount')
            this.setState({
                search: store.search,
                data: store.data,
                count: store.count,
                more: store.more,
                message: `Results for "${store.search}"`,
                hasData: true
            })

        } else {

            this.setState({
                search: 'Batman' //TODO: get a real parameter for the first search
            },
            () => this.getResults(Services.titleSearch, this.state.search, this.state.count))

        }
    }    

    componentDidUpdate(prevProps, prevState) {
       
        if (!this.state.hasData) { // there's no data from store        
            if(prevState.search !== this.state.search) {
                console.log(`antes: ${prevState.search} depois: ${this.state.search}`)
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
    }

    componentWillUnmount() {
        // update store
        const { store } = this.props;

        store.setSearchData(this.state.data);
        store.setSearchString(this.state.search);
        store.setSearchPage(this.state.count);
        store.setMoreButton(this.state.more)
    }

    onHandleChange = debounce((value) => {   
        
        if (value) {                    
            this.setState( prevState => ({ 
                loading: true,             
                search: value, 
                message: '',
                data: [],
                hasData: false  
            }),
            () => this.getResults(Services.titleSearch, value, 1) //callback
            );
        }

    }, 600);

    getResults = async (func, search, count) => {  
        
        this.setState({
            loading: true
        })

        try {            
            const results = await func(search, count);        

            // error
            if(results.data.Error) {
                this.setState({
                    loading: false,
                    data: [],
                    message: results.data.Error
                });
                
                
            } else {  // success  
                this.setState(prevState => ({
                    loading: false,
                    data: prevState.search === search ? prevState.data.concat(results.data.Search) : results.data.Search,                    
                    message: `Results for "${search}"`,                     
                }));
                
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
            }            

        } catch (error) {
            this.setState({               
                message: error,
                loading: false,             
            });
        }
    }    

    render() {
        return(
            <React.Fragment>                
                <section className='search-form'>

                    <div className="wrapper container-fluid"> 
                        <h2>{this.props.title}</h2>
                        
                        <SearchInput                               
                            name='movie-search-input'
                            placeholder="Type here..."
                            onChange={e => this.onHandleChange(e.target.value, this.state.count)}
                        />              
                    </div>

                </section>

                <Results 
                    loading={this.state.loading}
                    search={this.state.search}
                    movies={this.state.data} 
                    title={this.state.message} 
                    more={this.state.more}
                    onClickButton={() => this.getResults(Services.titleSearch, this.state.search, this.state.count)}
                /> 
            </React.Fragment>
        )
    }
})

export default SearchObs;