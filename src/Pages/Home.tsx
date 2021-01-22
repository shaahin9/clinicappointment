import React from 'react';
import MainLayout from 'Components/Layout/MainLayout';
import Wizard from 'Components/Wizard/Wizard';

const Home: React.FC = () => {
	return (
		<MainLayout title="نوبت دهی کلینیک بیمارستان جم">
			<Wizard />
		</MainLayout>
	);
};

export default Home;
