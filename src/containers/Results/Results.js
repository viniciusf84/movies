import React, { Component, Fragment } from 'react';

import LoadingContent from '../../components/DataDisplay/LoadingContent';
import Icon from '../../components/General/Icon';

import Services from '../../utils/services';

class Results extends Component {

    state = {
        loading: false
    }    

    loadInfo = (obj) => {
        const mape = obj.map(e => 
            <div className="result-list__item">
                <img src={e.Poster} />
            </div>
        );

        return mape;
    }

    render() {
        const { movies, title } = this.props;

        return(
            <LoadingContent isLoading={this.state.loading} loadingText="Loading results">
                {movies && movies.length > 0 &&
                    <Fragment>
                        <h4>{title}</h4>
                        <section id="results" className='result-list'> 
                            {this.loadInfo(movies)}
                        </section>
                    </Fragment>
                }
            </LoadingContent>
        )
    }
}

export default Results;