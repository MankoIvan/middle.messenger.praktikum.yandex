import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {Contact} from '../../components/contact/contact'
import {chatTmpl} from './chat.tmpl';

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
				style: 'main-small'
			}),
			contactOne: new Contact({
				id: 'contactOne',
				contact: ['Петя', 'Вася'],
				image: 'https://pbs.twimg.com/profile_images/671465795365560320/TiQW_VCt_400x400.jpg',
				message: "hello it's me",
				new: 3,
				time: '12:01'
			}),
			contactTwo: new Contact({
				id: 'contactOne',
				contact: ['Саша'],
				image: 'https://www.karusel-tv.ru/media/suit/256x256/media/broadcast_cover/2020/04/1586424937144045__.jpg',
				message: "hello it's you",
				time: '12:03'
			}),
			active: true,
			image: 'https://pbs.twimg.com/profile_images/671465795365560320/TiQW_VCt_400x400.jpg',
			contact: ['Петя', 'Вася'],
		});
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
