import Axios, {
	AxiosAdapter,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError,
} from 'axios';
import createIntanceLocalForage from 'Utils/createInstanceLocalForage';
import { toast } from 'react-toastify';

class AxiosOffline {
	defaultAdapter: AxiosAdapter;

	storage: LocalForage;

	constructor() {
		this.defaultAdapter = Axios.defaults.adapter as AxiosAdapter;
		this.storage = createIntanceLocalForage({ storageName: '@offline' });
	}

	private removeRequest(time: string): void {
		this.storage.removeItem(time);
	}

	private storeRequest(data: AxiosRequestConfig): void {
		this.storage.setItem(String(Date.now()), data);
		toast.info('اینترنت در دسترس نیست. درخواست به لیست ارسال نشده‌ها اضافه شد');
	}

	sendAllRequest(): void {
		this.storage.iterate((data: AxiosRequestConfig, time) => {
			this.defaultAdapter(data).then(() => this.removeRequest(time));
		});
	}

	adapter(config: AxiosRequestConfig): Promise<AxiosResponse> {
		// eslint-disable-next-line no-param-reassign
		config.timeout = config.timeout || 5000;
		const res = this.defaultAdapter(config)
			.catch((err: AxiosError) => {
				const { code, message, response } = err;

				if (
					response === undefined &&
					(code === 'ECONNABORTED' || message === 'Network Error')
				) {
					if (String(config.method) !== 'get') {
						this.storeRequest(config);
					}
				} else {
					// TODO: Logic
					// sendAllRequest();
				}

				return Promise.reject(err);
			})
			.then((resolve) => {
				// this.sendAllRequest();

				return Promise.resolve(resolve);
			});

		return res;
	}
}

export default AxiosOffline;
