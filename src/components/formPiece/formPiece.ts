import Handlebars from 'handlebars';
import Block from '../../modules/block/block';
import {formPieceTmpl} from './formPiece.tmpl';

export class FormPiece extends Block {
	constructor(props: {
    name: string;
    label: string;
    type: string;
    message?: string;
	addSelector?: string;
	value? :string;
  }) {
		super('div', props);
	}

	render() {
		const template = Handlebars.compile(formPieceTmpl);
		return template(this.props);
	}
}
