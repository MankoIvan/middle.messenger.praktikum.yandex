import HTTPTransport, {Options} from '../HTTPTransport/HTTPTransport';

const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

export class ChatAPI {
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
		return chatAPIInstance.get(`/${id}/users`);
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
		return chatAPIInstance.delete('/users', options);
	}

	getToken(id: string) {
		return chatAPIInstance.post(`/token/${id}`);
	}
}

export const chatRequester = new ChatAPI();
