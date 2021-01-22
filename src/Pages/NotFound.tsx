import React from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from 'bumbag';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100vh;
`;

const NotFound: React.FC = () => {
	const history = useHistory();
	return (
		<Container>
			<h2>صفحه مورد نظر یافت نشد</h2>
			<button className="button" type="button" onClick={() => history.goBack()}>
				صفحه قبل
			</button>
		</Container>
	);
};

export default NotFound;
