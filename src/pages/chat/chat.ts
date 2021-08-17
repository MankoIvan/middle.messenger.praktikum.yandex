import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {Contact} from '../../components/contact/contact';
import {FormPiece} from '../../components/formPiece/formPiece';
import {chatTmpl} from './chat.tmpl';
import Router from '../../modules/router/router';
import {chatRequester} from '../../modules/api/chat-api';
import {validateInput} from '../../modules/validation/validation';

const router = new Router('root');
const addSelector = 'user';

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
			chatAddChatButton: new Button({
				id: 'chatAddChatButton',
				text: 'Создать чат',
				type: 'submit',
				style: 'main',
			}),
			newChatInput: new FormPiece({
				name: 'new_chat_input',
				label: 'Новый чат',
				type: 'text',
				addSelector,
			}),
			contacts: {},
			contactsMarkUp: [],
			contactOne: new Contact({
				id: 1,
				title: 'Петя',
				image: 'http://placekitten.com/50/50',
				message: 'hello it\'s me',
				new: 3,
				time: '12:01',
			}),
			contactTwo: new Contact({
				id: 2,
				title: 'Саша',
				image: 'http://placekitten.com/60/60',
				message: 'hello it\'s you',
				new: 0,
				time: '12:03',
			}),
			events: {
				click: (event: Event) => this.clickHandler(event),
			},
			image: 'http://placekitten.com/50/50',
			contact: ['Петя', 'Вася'],
			addChatVisible: false,
		});
	}

	clickHandler(event: Event) {
		if (
			event.target
			=== document.getElementById(this.props.settingsButton.props.id)
		) {
			router.go('/settings');
		} else if (event.target!.classList.contains('contact__body')) {
			this.props.currentChat = this.props.contacts[event.target!.parentElement.id].props;
			this.props.contact = this.props.currentChat.title;
			this.props.image = this.props.currentChat.image;
			// ЗДЕСЬ БУДЕТ ЗАПРОС НА СООБЩЕНИЯ
			this.setProps(this.props);
		} else if (
			event.target
			=== document.getElementById(this.props.newChatButton.props.id)
		) {
			this.props.addChatVisible = !this.props.addChatVisible;
			this.setProps(this.props);
		} else if (
			event.target
			=== document.getElementById(this.props.chatAddChatButton.props.id)
		) {
			const errorMsgSelecor = `${addSelector}${this.props.newChatInput.props.name}ErrMessage`;
			const newChatName = document.getElementById(this.props.newChatInput.props.name)!.value;
			const valid = validateInput({
				value: newChatName,
				type: 'chatName',
				errorMsgSelecor,
			});
			if (valid) {
				chatRequester.createChat({
					data: {
						title: newChatName,
					},
				})
					.then(() => {
						this.props.addChatVisible = false;
						chatRequester.getChats()
							.then((data: XMLHttpRequest) => {
								this._setChatsToProps(data);
								this.setProps(this.props);
							})
							.catch(data => console.log(JSON.parse(data.response)));
					})
					.catch(data => console.log(JSON.parse(data.response)));
			}
		}
	}

	componentDidMount() {
		chatRequester.getChats()
			.then((data: XMLHttpRequest) => {
				this._setChatsToProps(data);
				this.setProps(this.props);
			})
			.catch(data => console.log(JSON.parse(data.response)));
	}

	_setChatsToProps(data: XMLHttpRequest) {
		const chats: {
			avatar: string,
			// eslint-disable-next-line camelcase
			created_by: number,
			id: number,
			// eslint-disable-next-line camelcase
			last_message: string,
			title: string,
			// eslint-disable-next-line camelcase
			unread_count: number
		}[] = JSON.parse(data.response);
		chats.forEach(item => {
			this.props.contacts[item.id] = new Contact({
				id: item.id,
				createdBy: item.created_by,
				title: item.title,
				image: item.avatar,
				message: item.last_message,
				new: item.unread_count,
			});
		});
		this.props.contactsMarkUp = [];
		Object.values(this.props.contacts).forEach((item: Contact) => {
			this.props.contactsMarkUp.push(item.render());
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
			chatAddChatButton: this.props.chatAddChatButton.render(),
			newChatInput: this.props.newChatInput.render(),
			contactOne: this.props.contactOne.render(),
			contactTwo: this.props.contactTwo.render(),
			currentChat: this.props.currentChat,
			image: this.props.image,
			contact: this.props.contact,
			contactsMarkUp: this.props.contactsMarkUp,
			addChatVisible: this.props.addChatVisible,
		});
	}
}
