import Handlebars from 'handlebars';
import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {error404Tmpl} from './error404.tmpl';
import Router from '../../modules/router/router';

const router = new Router('root');

export class Error404 extends Block {
	constructor() {
		super('layout', {
			backButton404: new Button({
				id: 'backButton404',
				text: 'Назад к чатам',
				type: 'button',
				style: 'main',
			}),
			events: {
				click: (event: Event) => this.clickHandler(event),
			},
		});
	}

	clickHandler(event: Event) {
		if (
			event.target
      === document.getElementById(this.props.backButton404.props.id)
		) {
			router.go('/messenger');
		}
	}

	render() {
		const template = Handlebars.compile(error404Tmpl);
		return template({
			backButton404: this.props.backButton404.render(),
		});
	}
}
