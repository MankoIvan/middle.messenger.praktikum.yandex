import HTTPTransport, {Options} from '../HTTPTransport/HTTPTransport';

const AuthAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI {
	signUp(options: Options) {
		return AuthAPIInstance.post('/signup', options);
	}

	signIn(options: Options) {
		return AuthAPIInstance.post('/signin', options);
	}

	getUser() {
		return AuthAPIInstance.get('/user');
	}

	logOut() {
		return AuthAPIInstance.post('/logout');
	}
}

export const authRequester = new AuthAPI();
