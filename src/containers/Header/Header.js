import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {

    const { pageTitle } = props;
        
    return(
        <header id="header" className="page-header">
            <div className="brand start-xs">
                <h1 className="page-title">
                    <Link to="/">
                        {pageTitle}
                    </Link>
                </h1>
            </div>    
        </header> 
    )
}

export default Header;