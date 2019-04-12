import React, { Component, } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Icon extends Component {

    render() {
       return (
           <div className="icon-wrapper">
                <FontAwesomeIcon icon={this.props.icon} />
           </div>
        );
    }
}

export default Icon;