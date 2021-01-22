import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from 'Components/Router/Router';
import { setAuthorization } from 'Network/Axios';

const App: React.FC = () => {
	React.useEffect(() => {
		async function token() {
			await setAuthorization();
		}
		token();
	}, []);

	return (
		<BrowserRouter>
			<Router />
			<ToastContainer
				limit={3}
				position="bottom-center"
				autoClose={12000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl
				pauseOnFocusLoss
				draggable
			/>
		</BrowserRouter>
	);
};

export default App;
