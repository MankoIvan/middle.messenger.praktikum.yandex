import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {Contact} from '../../components/contact/contact';
import {chatTmpl} from './chat.tmpl';
import Router from '../../modules/router/router';

const router = new Router('root');

export class Chat extends Block {
	constructor() {
		super('layout', {
			newChatButton: new Button({
				id: 'newChatButton',
				text: '+',
				type: 'button',
			}),
			settingsButton: new Button({
				id: 'settingsButton',
				text: 'Настройки',
				type: 'button',
			}),
			chatSettingsButton: new Button({
				id: 'chatSettingsButton',
				text: '…',
				type: 'button',
			}),
			chatAttachButton: new Button({
				id: 'chatAttachButton',
				text: '…',
				type: 'button',
			}),
			chatSendButton: new Button({
				id: 'chatSendButton',
				text: '→',
				type: 'button',
				style: 'main-small',
			}),
			contactOne: new Contact({
				id: 'contactOne',
				contact: ['Петя', 'Вася'],
				image: 'http://placekitten.com/50/50',
				message: 'hello it\'s me',
				new: 3,
				time: '12:01',
			}),
			contactTwo: new Contact({
				id: 'contactOne',
				contact: ['Саша'],
				image: 'http://placekitten.com/60/60',
				message: 'hello it\'s you',
				time: '12:03',
			}),
			events: {
				click: (event: Event) => this.clickHandler(event),
			},
			active: true,
			image: 'http://placekitten.com/50/50',
			contact: ['Петя', 'Вася'],
		});
	}

	clickHandler(event: Event) {
		if (
			event.target
      === document.getElementById(this.props.settingsButton.props.id)
		) {
			router.go('/settings');
		}
	}

	render() {
		const template = Handlebars.compile(chatTmpl);
		return template({
			newChatButton: this.props.newChatButton.render(),
			settingsButton: this.props.settingsButton.render(),
			chatSettingsButton: this.props.chatSettingsButton.render(),
			chatAttachButton: this.props.chatAttachButton.render(),
			chatSendButton: this.props.chatSendButton.render(),
			contactOne: this.props.contactOne.render(),
			contactTwo: this.props.contactTwo.render(),
			active: this.props.active,
			image: this.props.image,
			contact: this.props.contact,
		});
	}
}
