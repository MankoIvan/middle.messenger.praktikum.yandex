import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {error404Tmpl} from './error404.tmpl';

export class Error404 extends Block {
	constructor() {
		super('layout', {
			backButton: new Button({
				id: 'backButton',
				text: 'Назад к чатам',
				type: 'button',
				style: 'main',
			}),
		});
	}

	render() {
		const template = Handlebars.compile(error404Tmpl);
		return template({
			backButton: this.props.backButton.render(),
		});
	}
}
