import HTTPTransport, {Options} from '../HTTPRequest';
import {BaseAPI} from './base-api';

const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

export class ChatAPI extends BaseAPI {
	signUp(options: Options) {
		return chatAPIInstance.post('/signup', options);
	}

	signIn(options: Options) {
		return chatAPIInstance.post('/signin', options);
	}

	getUser() {
		return chatAPIInstance.get('/user');
	}

	logOut(options: Options) {
		return chatAPIInstance.post('/logout', options);
	}
}
