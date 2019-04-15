import React, { Component } from 'react';

// Containers
import SearchObs from '../Search';

// Store
import store from '../../stores/SearchStore';

class Home extends Component {
    render() {
        return(
            <section id="home" className="home">
                <main className="main-content">                    
                    <SearchObs store={store} title="Search for your favorite movie" />                      
                </main>
            </section>
        )
    }
}

export default Home;