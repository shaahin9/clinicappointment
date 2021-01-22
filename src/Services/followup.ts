import { AxiosResponse } from 'axios';
import axios from 'Network/Axios';

async function $GetCaptcha(): Promise<any> {
	const json = await axios('/Appointment/GetCaptcha?width=200', {
		responseType: 'arraybuffer',
	});
	const image = btoa(
		new Uint8Array(json.data).reduce(
			(data, byte) => data + String.fromCharCode(byte),
			''
		)
	);

	return {
		url: `data:${json.headers['content-type'].toLowerCase()};base64,${image}`,
		id: json.headers['captchaid'],
	};
}

async function $Tracking(
	TrackingCode: string,
	NationalCode: string,
	CaptchaCode: string,
	CaptchaId: string
): Promise<AxiosResponse<any>> {
	const json = await axios(
		`/Appointment/Tracking?TrackingCode=${TrackingCode}&NationalCode=${NationalCode}&CaptchaCode=${CaptchaCode}&CaptchaId=${CaptchaId}`
	);

	return json;
}
export { $GetCaptcha, $Tracking };
