import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {contactTmpl} from './contact.tmpl';

export class Contact extends Block {
	constructor(props: {
    id: string;
    contact: string[];
	image?: string;
    message?: string;
	new?: number;
	time?: string
  }) {
		super('div', props);
	}

	render() {
		const template = Handlebars.compile(contactTmpl);
		return template(this.props);
	}
}
