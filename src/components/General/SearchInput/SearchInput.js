import React, { Component } from 'react';

class SearchInput extends Component {

    render() {
        const { name, placeholder, onChange } = this.props;

        return(
            <input
                type="text"                                   
                className='form-control'
                name={name}
                placeholder={placeholder}
                onChange={onChange}
            />
        )
    }
}

export default SearchInput;