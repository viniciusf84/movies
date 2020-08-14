import React, { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Item(props) {
	const { id, image, title } = props;
	const searchContext = useContext(SearchContext);
	const { setUpdateList } = searchContext.actions;

	return (
		<div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
			<div className="result-list__item" onClick={() => setUpdateList(false)}>
				<Link to={`/profile/${id}`}>
					<div
						className={
							image === 'N/A' ? 'wrap icon__wrapper' : 'wrap  img__wrapper'
						}
					>
						{image === 'N/A' ? (
							<FontAwesomeIcon icon={faFilm} size="10x" />
						) : (
							<img src={image} alt={title} />
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

export default Item;
