import './index.scss';

import {Error404} from './pages/error404/error404';
import {Error500} from './pages/error500/error500';
import {Authorize} from './pages/authorize/authorize';
import {Register} from './pages/register/register';
import {User} from './pages/user/user';
import {Chat} from './pages/chat/chat';
import Router from './modules/router/router';

const router = new Router('root');

router
	.use('/404', Error404)
	.use('/500', Error500)
	.use('/sign-up', Register)
	.use('/', Authorize)
	.use('/settings', User)
	.use('/messenger', Chat)
	.start();
