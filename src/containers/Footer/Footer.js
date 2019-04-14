import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return(
            <footer id="footer" className="footer">
                <p>{this.props.text}</p>
            </footer>
        )
    }
}

export default Footer;