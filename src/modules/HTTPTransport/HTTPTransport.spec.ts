import HTTPTransport from './HTTPTransport';
import {expect} from 'chai';

describe('Проверка модуля отправки запросов', () => {
	let HTTPTransportInstance: HTTPTransport;
	beforeEach(() => {
		HTTPTransportInstance = new HTTPTransport('https://jsonplaceholder.typicode.com');
	});

	it('get', () => {
		HTTPTransportInstance.get('/posts/1')
			.then((r: XMLHttpRequest) => {
				const res = JSON.parse(r.response);
				expect(res.id.toString(), '1');
			});
	});
	it('put', () => {
		const data = {
			id: 1,
			title: 'foo',
			body: 'bar',
			userId: 1,
		};
		HTTPTransportInstance.put('/posts/1', {data})
			.then((r: XMLHttpRequest) => {
				const res = JSON.parse(r.response);
				expect(res.title, data.title);
			});
	});
	it('post', () => {
		const data = {
			title: 'bar',
		};
		HTTPTransportInstance.post('/posts', {data})
			.then((r: XMLHttpRequest) => {
				const res = JSON.parse(r.response);
				expect(res.title, data.title);
			});
	});
	it('delete', () => {
		HTTPTransportInstance.delete('/posts/1')
			.then((r: XMLHttpRequest) => {
				const {status} = r;
				expect(status.toString(), '200');
			});
	});
});
