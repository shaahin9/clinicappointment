import CreateIntanceLocalForage from 'Utils/createInstanceLocalForage';

const SEPARATOR = '//**//';
const Instance = CreateIntanceLocalForage({ storageName: '@cache' });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function flushCache() {
	Instance.clear();
}

function store(key: string, value: string): void {
	const finalValue = `${value}${SEPARATOR}${Date.now().toString()}`;
	Instance.setItem(key, finalValue);
}

interface IsValidResponse {
	isValid: boolean;
	value?: string;
}

// Returns true if an object has been stored using the store method
// and have yet not expired
async function isValid(
	key: string,
	CACHE_INTERVAL: number
): Promise<IsValidResponse> {
	const value = (await Instance.getItem(key)) as string;

	if (value === null) {
		return {
			isValid: false,
		};
	}

	const values = value.split(SEPARATOR);
	const timestamp = Number(values[1]);
	if (Number.isNaN(timestamp)) {
		return {
			isValid: false,
		};
	}
	const date = new Date(timestamp);
	if (date.toString() === 'Invalid Date') {
		return {
			isValid: false,
		};
	}
	if (Date.now() - date.getTime() < CACHE_INTERVAL) {
		return {
			isValid: true,
			value: values[0],
		};
	}
	await Instance.removeItem(key);
	return {
		isValid: false,
	};
}

export { store, isValid, flushCache };
