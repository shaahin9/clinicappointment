import React from 'react';
import { styled } from 'bumbag';

const Logo = styled.img`
	position: fixed;
	top: 50%;
	left: 50%;
	width: 128px;
	height: 128px;
	/* border-radius: 8px; */
	/* box-shadow: 0 8px 16px rgba(220, 220, 220, 0.1); */
	transform: translate(-50%, -50%);
	z-index: 8989;
`;

const SpinnerScreen: React.FC = () => {
	return <Logo src="/media/jam_h_logo.png" />;
};

export default SpinnerScreen;
