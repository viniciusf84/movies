import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SearchItem(props) {
  const { id, image, title } = props;

  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <div className="result-list__item">
        <Link to={`/profile/${id}`}>
          <div className={image ? 'wrap  img__wrapper' : 'wrap icon__wrapper'}>
            {image ? (
              <img src={image} alt={title} />
            ) : (
              <FontAwesomeIcon icon={faFilm} size="10x" />
            )}
          </div>
        </Link>
        <div className="title">
          <Link to={`/profile/${id}`}>
            <h5>{title}</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
