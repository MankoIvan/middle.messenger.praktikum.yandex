import Handlebars from 'handlebars';
import Block from '../../modules/block/block';
import {contactTmpl} from './contact.tmpl';

export class Contact extends Block {
	constructor(props: {
		id: number;
		createdBy?: number;
		title: string;
		image?: string;
		message?: {};
		new: number;
		time?: string
	}) {
		super('div', props);
	}

	render() {
		const template = Handlebars.compile(contactTmpl);
		return template(this.props);
	}
}
