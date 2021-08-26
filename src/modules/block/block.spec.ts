/**
 * @instructure/mocha-environment jsdom
 */

import Block from './block';
import Handlebars from 'handlebars';
import {expect} from 'chai';

const tmpl = '<p>{{tmplText}}</p>';

class TestBlock extends Block {
	constructor() {
		super('layout', {
			tmplText: 'templatre text',
			events: {
				click: (e: Event) => {
					console.log(e);
				},
			},
		});
	}

	render() {
		const template = Handlebars.compile(tmpl);
		return template({tmplText: this.props.tmplText});
	}
}

describe('Проверка блока', () => {
	const testBlock = new TestBlock();
	const par = testBlock.getContent().querySelector('p');

	it('использование props', () => {
		expect(par!.textContent, 'templatre text');
	});
});
