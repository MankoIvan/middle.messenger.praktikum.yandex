import Handlebars from 'handlebars';
import Block from '../../modules/block/block';
import {messageTmpl} from './message.tmpl';

export class Message extends Block {
	constructor(props: {
		text: string,
		id: number,
		incoming: Boolean
	}) {
		super('div', props);
	}

	render() {
		const template = Handlebars.compile(messageTmpl);
		return template(this.props);
	}
}
