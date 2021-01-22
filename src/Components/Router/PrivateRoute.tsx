import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
	const token = localStorage.getItem('token');
	const refreshToken = localStorage.getItem('refreshToken');
	try {
		// decode(token);
		// decode(refreshToken);
		// console.log([decode(token), decode(refreshToken)]);
		return true;
	} catch (error) {
		return false;
	}
};

interface IProps {
	Component: any;
}

function PrivateRoute({ Component, ...rest }: IProps) {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
						}}
					/>
				)
			}
		/>
	);
}

export default PrivateRoute;
