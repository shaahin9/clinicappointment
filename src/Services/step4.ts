import { AxiosResponse } from 'axios';
import axios from 'Network/Axios';

async function $CreateAppointment(values: any): Promise<AxiosResponse<any>> {
	const data = JSON.stringify(values);

	const json = await axios('/Appointment/CreateAppointment', {
		method: 'POST',
		data,
	});

	return json;
}

export default $CreateAppointment;
