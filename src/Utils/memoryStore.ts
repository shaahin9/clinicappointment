const cache = new Map();

const cacheHandler = {
	has(key: string): any {
		return cache.has(key);
	},

	set(key: string, value: any): any {
		return cache.set(key, value);
	},

	get(key: string): any {
		return cache.get(key)[0];
	},

	delete(key: string): any {
		return cache.delete(key);
	},

	clear(): any {
		return cache.clear();
	},
};

export default cacheHandler;
