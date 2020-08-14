import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop(props) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [props.location]);

	return <withRouter>{props.children}</withRouter>;
}

export default withRouter(ScrollToTop);
