import HTTPTransport, {Options} from '../HTTPRequest';
import {BaseAPI} from './base-api';

const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

export class ChatAPI extends BaseAPI {
	getChats() {
		return chatAPIInstance.get('/');
	}

	createChat(options: Options) {
		return chatAPIInstance.post('/', options);
	}

	deleteChat(options: Options) {
		return chatAPIInstance.delete('/', options);
	}

	getChatUsers(id: string) {
		return chatAPIInstance.get(`/:${id}/users`);
	}

	getChatnewMessages(id: string) {
		return chatAPIInstance.get(`/new/:${id}`);
	}

	uploadChatAvatar(options: Options) {
		return chatAPIInstance.put('/avatar', options);
	}

	addUserToChat(options: Options) {
		return chatAPIInstance.put('/users', options);
	}

	deleteUsersFromChat(options: Options) {
		return chatAPIInstance.put('/users', options);
	}
}

export const chatRequester = new ChatAPI();
