import React, { Component } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/General/Button';

// Containers
import Search from '../Search';


class Home extends Component {
    render() {
        return(
            <section id="home" className="home">
                <main className="main-content">                    
                    <div className="container">                        
                        <h1 className="page-title">CINEGEEK</h1>
                        
                        <Search title="Search for your favorite movie" />                                          
                    </div>
                </main>
            </section>
        )
    }
}

export default Home;