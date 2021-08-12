import HTTPTransport, {Options} from '../HTTPRequest';
import {BaseAPI} from './base-api';

const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

export class ChatAPI extends BaseAPI {
	changeUserInfo(options: Options) {
		return chatAPIInstance.put('/profile', options);
	}

	changeUserAvatar(options: Options) {
		return chatAPIInstance.put('/profile/avatar', options);
	}

	changeUserPassword(options: Options) {
		return chatAPIInstance.put('/password', options);
	}

	getUserInfo(id: string) {
		return chatAPIInstance.get(`/:${id}`);
	}

	findUser(options: Options) {
		return chatAPIInstance.post('/search', options);
	}
}
