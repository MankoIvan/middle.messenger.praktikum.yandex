import './index.scss';

import {Error} from './pages/error/error';
import {Authorize} from './pages/authorize/authorize';
import {Register} from './pages/register/register';
import {User} from './pages/user/user';

const root = <HTMLElement>document.querySelector('#root');

const path = window.location.pathname;

switch (path) {
	case '/authorize':
		root.appendChild(new Authorize().getContent());
		break;
	case '/user':
		root.appendChild(new User().getContent());
		break;
	case '/register':
		root.appendChild(new Register().getContent());
		break;
	case '/':
		root.appendChild(
			new Error({
				code: 'Упс...',
				message: 'Страницы пока нет, но уже скоро она появится',
			}).getContent(),
		);
		break;
	case '/500':
		root.appendChild(
			new Error({code: '500', message: 'Мы уже фиксим'}).getContent(),
		);
		break;
	default:
		root.appendChild(
			new Error({code: '404', message: 'Не туда попали'}).getContent(),
		);
}
