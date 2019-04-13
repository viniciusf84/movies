import React, { Component } from 'react';

class Header extends Component {
    render() {
        const { pageTitle } = this.props;
        
        return(
            <header className="page-header">
                <h1 className="page-title">{pageTitle}</h1>    
            </header> 
        )
    }
}

export default Header;