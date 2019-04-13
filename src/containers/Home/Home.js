import React, { Component } from 'react';

// Containers
import Header from '../Header';
import Search from '../Search';


class Home extends Component {
    render() {
        return(
            <section id="home" className="home">
                <main className="main-content">  
                    <Header pageTitle="TELAFILME" />
                                   
                    <div className="container"> 
                        <Search title="Search for your favorite movie" />                                          
                    </div>
                </main>
            </section>
        )
    }
}

export default Home;