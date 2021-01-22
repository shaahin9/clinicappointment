import { AxiosResponse } from 'axios';
import axios from 'Network/Axios';

async function $GetDoctorDropDown(): Promise<AxiosResponse<any>> {
	const json = await axios('/DropDown/GetDoctorDropDown');

	return json;
}

async function $GetBaseDropDown(values: any): Promise<AxiosResponse<any>> {
	const data = JSON.stringify(values);

	const json = await axios('/DropDown/GetBaseDropDown', {
		method: 'POST',
		data,
	});

	return json;
}

export { $GetDoctorDropDown, $GetBaseDropDown };
