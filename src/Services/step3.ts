import { AxiosResponse } from 'axios';
import axios from 'Network/Axios';

async function $RequestOtp(mobile: string): Promise<AxiosResponse<any>> {
	const json = await axios(`/Appointment/RequestOtp?mobile=${mobile}`);

	return json;
}

async function $ConfirmOtp(values: any): Promise<AxiosResponse<any>> {
	const data = JSON.stringify(values);

	const json = await axios('/Appointment/ConfirmOtp', {
		method: 'POST',
		data,
	});

	return json;
}

export { $RequestOtp, $ConfirmOtp };
