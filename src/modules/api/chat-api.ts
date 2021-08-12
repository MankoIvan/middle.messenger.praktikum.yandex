import HTTPTransport, {Options} from '../HTTPRequest';
import {BaseAPI} from './base-api';

const chatAPIInstance = new HTTPTransport('api/v1/chats');

export class ChatAPI extends BaseAPI {
	createChat(options: Options) {
		return chatAPIInstance.post('/', options);
	}

	request() {
		return chatAPIInstance.get('/full');
	}
}
