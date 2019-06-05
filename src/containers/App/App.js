import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "mobx-react";

// Containers
import Header from '../Header';
import Footer from '../Footer';

// Pages
import Home from "../Home"
import Profile from "../Profile"

// utils
import ScrollToTop from '../../utils/ScrollToTop';

// Store
import { SearchStoreContext } from '../../stores/SearchStore';


const App = () => {
    const searchContext = useContext(SearchStoreContext);
    
    return (
        <Provider store={searchContext}>
            <Router>
                <ScrollToTop>
                    <Header pageTitle="TELAFILME" />
                    <Route exact path="/" component={Home} />                    
                    <Route path="/profile/:movieId" component={Profile} />
                    <Footer text="TelaFilme 2019 - Todos os direitos reservados" />    
                </ScrollToTop>
            </Router>
        </Provider>
    );

}

export default App;