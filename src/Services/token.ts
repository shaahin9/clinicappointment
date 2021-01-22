import axios, { AxiosResponse } from 'axios';
import createIntanceLocalForage from 'Utils/createInstanceLocalForage';

export interface IToken {
	expiration: string;
	token: string;
}

export interface ICredential {
	Username: string;
	Password: string;
	System?: boolean;
}

const TOKEN: IToken = {
	expiration: '',
	token: '',
};

async function setToken(token: IToken): Promise<IToken> {
	const storage = createIntanceLocalForage({ storageName: '@token' });
	return storage.setItem('user', token);
}

async function getToken(): Promise<IToken> {
	const storage = createIntanceLocalForage({ storageName: '@token' });
	let token = (await storage.getItem('user')) as IToken | null;

	if (token === null) {
		token = TOKEN;
		setToken(token);
	}

	return token;
}

async function $Login(credential: ICredential): Promise<AxiosResponse<IToken>> {
	const data = JSON.stringify(credential);

	const json = await axios.post(
		'http://api.sjdemo.ir/api/Authenticate/Login',
		data,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	setToken({ ...json.data, system: credential.System });

	return json;
}

export { getToken, setToken, $Login };
