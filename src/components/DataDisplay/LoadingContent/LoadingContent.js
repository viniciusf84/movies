import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const LoadingContent = props => {
    const { isLoading, loadingText } = props;

    if (isLoading) {
        return (
            <div className="loading-content">
                <div class="loading-content__wrapper">
                    <p>{loadingText}</p>
                    <FontAwesomeIcon icon={faSpinner} size="3x" spin />
                </div>
            </div>
        )
    }

    return props.children;
}

export default LoadingContent;