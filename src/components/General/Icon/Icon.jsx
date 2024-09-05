import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Icon(props) {
	return (
		<div className="icon-wrapper">
			<FontAwesomeIcon icon={props.icon} />
		</div>
	);
}

export default Icon;
