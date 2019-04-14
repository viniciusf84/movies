import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Containers
import Header from '../Header';
import Footer from '../Footer';

// Pages
import Home from "../Home"
import Profile from "../Profile"

// utils
import ScrollToTop from '../../utils/ScrollToTop';


class App extends Component {

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header pageTitle="TELAFILME" />
                        <ScrollToTop>
                            <Route exact path="/" component={Home} />                    
                            <Route path="/profile/:movieId" component={Profile} />
                        </ScrollToTop>
                    <Footer text="TelaFilme 2019 - Todos os direitos reservados" />    
                </React.Fragment> 
            </Router>
        );
    }
}

export default App;