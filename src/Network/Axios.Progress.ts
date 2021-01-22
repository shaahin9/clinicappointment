import NProgress from 'nprogress';
import { AxiosInstance } from 'axios';

// const calculatePercentage = (loaded: number, total: number): number =>
// 	Math.floor(loaded * 1.0) / total;

const setupUpdateProgress = (instance: AxiosInstance) => {
	// eslint-disable-next-line no-param-reassign
	instance.defaults.onDownloadProgress = () => {
		// const percentage = calculatePercentage(e.loaded, e.total);
		// NProgress.set(percentage);
		NProgress.start();
	};
};

const setupStopProgress = (instance: AxiosInstance) => {
	instance.interceptors.response.use(
		(response) => {
			NProgress.done(true);
			return response;
		},
		(error) => {
			NProgress.done(true);
			return Promise.reject(error);
		}
	);
};

function createAxiosProgressBar(
	instance: AxiosInstance,
	config: Partial<NProgress.NProgressOptions>
): void {
	NProgress.configure(config);
	setupUpdateProgress(instance);
	setupStopProgress(instance);
}

export default createAxiosProgressBar;
