import React from 'react';

// Containers
import SearchObs from '../Search';

function Home() {
	return (
		<section id="home" className="home">
			<main className="main-content">
				<SearchObs title="Search for your favorite movie" />
			</main>
		</section>
	);
}

export default Home;
