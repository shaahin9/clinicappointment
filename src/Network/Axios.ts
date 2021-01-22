import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { $Login, getToken } from 'Services/token';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const axios = Axios.create();
const useAxios = makeUseAxios({
	axios,
});

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://api.sjdemo.ir/api/';

// (async function initialAuth() {
// 	await $Login({
// 		Username: 'AppointmentUser',
// 		Password: 'gt45+8&@)5kjRT',
// 		System: true,
// 	});
// })();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const setAuthorization = async () => {
	const token = await getToken();
	axios.defaults.headers.common.Authorization = `Bearer ${token.token}`;
	return new Promise((resolve, reject) => {
		if (token.token) {
			resolve(token);
		} else {
			reject(new Error('Haven`t Token yet'));
		}
	});
};

const refreshAuthLogic = async (failedRequest: any): Promise<any> => {
	try {
		const tokenRefreshResponse = await $Login({
			Username: 'AppointmentUser',
			Password: 'gt45+8&@)5kjRT',
			System: true,
		});

		axios.defaults.headers.common.Authorization = `Bearer ${tokenRefreshResponse.data.token}`;
		failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.token}`;

		return Promise.resolve();
	} catch (error) {
		console.log(error);
	}
};

createAuthRefreshInterceptor(axios, refreshAuthLogic, {
	statusCodes: [401, 403],
});

export default axios;
export { setAuthorization, useAxios };
