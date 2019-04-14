import React, { Component } from 'react';

// Containers
import Search from '../Search';


class Home extends Component {
    render() {
        return(
            <section id="home" className="home">
                <main className="main-content">                    
                                   
                    <div className="wrapper"> 
                        <Search title="Search for your favorite movie" />                                          
                    </div>
                    
                </main>
            </section>
        )
    }
}

export default Home;