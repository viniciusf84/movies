import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchInput extends Component {

    render() {
        const { name, placeholder, onChange } = this.props;

        return(
            <React.Fragment>                
                <input
                    type="text"                                   
                    className='form-control'
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <span className='icon__wrapper'>
                    <FontAwesomeIcon className="end-xs" icon={faSearch} size='2x'/>
                </span>
            </React.Fragment>
        )
    }
}

export default SearchInput;