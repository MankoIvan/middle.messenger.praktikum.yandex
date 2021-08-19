import HTTPTransport, {Options} from '../HTTPTransport/HTTPTransport';
import {BaseAPI} from './base-api';

const UserAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

export class UserAPI extends BaseAPI {
	changeUserInfo(options: Options) {
		return UserAPIInstance.put('/profile', options);
	}

	changeUserAvatar(options: Options) {
		return UserAPIInstance.put('/profile/avatar', options);
	}

	changeUserPassword(options: Options) {
		return UserAPIInstance.put('/password', options);
	}

	getUserInfo(id: string) {
		return UserAPIInstance.get(`/:${id}`);
	}

	findUser(options: Options) {
		return UserAPIInstance.post('/search', options);
	}
}

export const userRequester = new UserAPI();
