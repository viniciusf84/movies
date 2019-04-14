import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Containers
import Header from '../Header';
import Footer from '../Footer';

// Pages
import Home from "../Home"
import Profile from "../Profile"


class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Header pageTitle="TELAFILME" />

                    <Route exact path="/" component={Home} />                    
                    <Route path="/profile/:movieId" component={Profile} />

                    <Footer text="TelaFilme 2019 - Todos os direitos reservados" />                  
                </Fragment>
            </Router>
        );
    }
}

export default App;