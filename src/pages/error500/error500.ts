import Handlebars from 'handlebars';
import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {error500Tmpl} from './error500.tmpl';
import Router from '../../modules/router/router';

const router = new Router('root');

export class Error500 extends Block {
	constructor() {
		super('layout', {
			backButton500: new Button({
				id: 'backButton500',
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
      === document.getElementById(this.props.backButton500.props.id)
		) {
			router.go('/messenger');
		}
	}

	render() {
		const template = Handlebars.compile(error500Tmpl);
		return template({
			backButton500: this.props.backButton500.render(),
		});
	}
}
