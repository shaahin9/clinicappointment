import localForage from 'localforage';

interface IInstance {
	storageName: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createIntanceLocalForage({ storageName = '@cache' }: IInstance) {
	const instance = localForage.createInstance({
		name: storageName,
	});

	// instance.setDriver(localForage.LOCALSTORAGE);

	return instance;
}

export default createIntanceLocalForage;
