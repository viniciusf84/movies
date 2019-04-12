import React, { Component, Fragment } from 'react';
import Icon from '../../General/Icon';
import { Link } from 'react-router-dom';

class ValidateIcon extends Component {

    render() {
        const { text, icon, link, disabled } = this.props;

       return (
           <div className="bottom">
                <button className={link ? "btn btn-primary" : "btn btn-primary no-link"} disabled={disabled}>
                    {link &&
                    <Link to={link}>
                        <span>
                            {text}
                        </span> 
                        <Icon icon={icon} />
                    </Link>
                    }
                    {!link &&
                    <Fragment>
                        {text} <Icon icon={icon} />
                    </Fragment>
                    }
                </button>
           </div>
        );
    }
}

export default ValidateIcon;