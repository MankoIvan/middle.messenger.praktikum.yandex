enum METHODS {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

export type Options = {
	method?: string;
	headers?: Record<string, string>;
	data?: {[key: string]: unknown};
	timeout?: number;
};

function queryStringify(data: {[key: string]: unknown}) {
	let strigified: string = '?';
	Object.keys(data).forEach(item => {
		strigified += `${item}=${data[item]}&`;
	});

	return strigified.slice(0, strigified.length - 1);
}

export default class HTTPTransport {
	baseURL: string;
	constructor(baseURL: string = '') {
		this.baseURL = baseURL;
	}

	get = (url: string, options: Options = {}) =>
		this.request(this.baseURL + url, {...options, method: METHODS.GET}, options.timeout);

	put = (url: string, options: Options = {}) =>
		this.request(this.baseURL + url, {...options, method: METHODS.PUT}, options.timeout);

	post = (url: string, options: Options = {}) =>
		this.request(this.baseURL + url, {...options, method: METHODS.POST}, options.timeout);

	delete = (url: string, options: Options = {}) =>
		this.request(this.baseURL + url, {...options, method: METHODS.DELETE}, options.timeout);

	request(url: string, options: Options, timeout: number = 5000) {
		const {method = METHODS.GET, headers = {}, data = {}} = options;
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(
				method,
				method === METHODS.GET && Boolean(data)
					? `${url}${queryStringify(data)}`
					: url,
			);

			xhr.setRequestHeader('content-type', 'application/json');
			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.withCredentials = true;

			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(xhr);
				} else {
					reject(xhr);
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				// @ts-ignore
				xhr.send(JSON.stringify(data));
			}
		});
	}
}
