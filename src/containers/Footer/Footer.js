import React from 'react';

function Footer(props) {
	return (
		<footer id="footer" className="footer">
			<p>{props.text}</p>
		</footer>
	);
}

export default Footer;
