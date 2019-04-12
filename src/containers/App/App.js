import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../Home"
import Search from "../Search";

class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Route exact path="/" component={Home} />
                    <Route path="/search-character" component={Search} />                    
                </Fragment>
            </Router>
        );
    }
}

export default App;