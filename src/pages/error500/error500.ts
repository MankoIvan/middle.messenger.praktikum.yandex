import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {error500Tmpl} from './error500.tmpl';

export class Error500 extends Block {
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
		const template = Handlebars.compile(error500Tmpl);
		return template({
			backButton: this.props.backButton.render(),
		});
	}
}
