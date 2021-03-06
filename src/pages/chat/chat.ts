/* eslint-disable max-len */
import Handlebars from 'handlebars';
import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {Contact} from '../../components/contact/contact';
import {FormPiece} from '../../components/formPiece/formPiece';
import {chatTmpl} from './chat.tmpl';
import Router from '../../modules/router/router';
import {chatRequester} from '../../modules/api/chat-api';
import {authRequester} from '../../modules/api/auth-api';
import {validateInput} from '../../modules/validation/validation';
import {userRequester} from '../../modules/api/user-api';
import SocketModule from '../../modules/socket';

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
			deleteUserButton: new Button({
				id: 'deleteUserButton',
				text: '-',
				type: 'button',
				style: 'alert-small',
			}),
			deleteChatButton: new Button({
				id: 'deleteChatButton',
				text: 'Удалить чат',
				type: 'button',
				style: 'alert',
			}),
			addUserButton: new Button({
				id: 'addUserButton',
				text: '+',
				type: 'button',
				style: 'main',
			}),
			newChatInput: new FormPiece({
				name: 'new_chat_input',
				label: 'Новый чат',
				type: 'text',
				addSelector,
			}),
			addUserInput: new FormPiece({
				name: 'add_user_input',
				label: 'Добавить пользователя',
				type: 'text',
				addSelector,
			}),
			contacts: {},
			contactsMarkUp: [],
			events: {
				click: (event: Event) => this.clickHandler(event),
			},
			addChatVisible: false,
			chatSettingsVisible: false,
		});
	}

	clickHandler(event: Event) {
		if (
			event.target
			=== document.getElementById(this.props.settingsButton.props.id)
		) {
			router.go('/settings');
		} else if (event.target!.classList.contains('contact__body')) {
			this._openChat(event);
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
			this._addChat();
		} else if (
			event.target
			=== document.getElementById(this.props.chatSettingsButton.props.id)
		) {
			this.props.chatSettingsVisible = !this.props.chatSettingsVisible;
			this.setProps(this.props);
		} else if (
			event.target
			=== document.getElementById(this.props.deleteChatButton.props.id)
		) {
			this._deleteChat();
		} else if (
			event.target
			=== document.getElementById(this.props.addUserButton.props.id)
		) {
			this._addUserToChat();
		} else if (
			event.target!.id === 'deleteUserButton'
		) {
			this._deleteUserFromChat(event);
		}
	}

	_openChat(event: Event) {
		this.props.chatSettingsVisible = false;
		this.props.currentChat = this.props.contacts[event.target!.parentElement.id].props;
		this.props.contact = this.props.currentChat.title;
		this.props.image = this.props.currentChat.image;
		chatRequester.getChatUsers(this.props.currentChat.id)
			.then((data: XMLHttpRequest) => {
				this.props.currentChat.contacts = JSON.parse(data.response);
				this.setProps(this.props);
			})
			.catch(data => console.log(JSON.parse(data.response)));
		chatRequester.getToken(this.props.currentChat.id)
			.then((data: XMLHttpRequest) => {
				this.props.currentChat.token = JSON.parse(data.response).token;
				this.setProps(this.props);

				const chatBody = document.getElementById('chatBody');
				const socket = new SocketModule(this.props.userData.id, this.props.currentChat.id, this.props.currentChat.token, chatBody);

				const messageInput = document.getElementById('messageInput');
				const sendMessageButton = document.getElementById(this.props.chatSendButton.props.id);
				sendMessageButton?.addEventListener('click', () => {
					socket.send(JSON.stringify({
						content: messageInput?.value,
						type: 'message',
					}));
					messageInput!.value = '';
				});
			})
			.catch(data => console.log(JSON.parse(data.response)));
	}

	_addChat() {
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

	_deleteChat() {
		chatRequester.deleteChat({
			data: {
				chatId: this.props.currentChat.id,
			},
		})
			.then(() => {
				chatRequester.getChats()
					.then((data: XMLHttpRequest) => {
						this._setChatsToProps(data);
						this.props.chatSettingsVisible = false;
						this.props.currentChat = null;
						// УДАЛИТЬ СООБЩЕНИЯ
						this.setProps(this.props);
					})
					.catch(data => console.log(JSON.parse(data.response)));
			})
			.catch(data => console.log(JSON.parse(data.response)));
	}

	_addUserToChat() {
		const newAddedUser = document.getElementById(this.props.addUserInput.props.name)!.value;
		userRequester.findUser({
			data: {
				login: newAddedUser,
			},
		})
			.then((data: XMLHttpRequest) => {
				chatRequester.addUserToChat({
					data: {
						users: [
							JSON.parse(data.response)[0].id,
						],
						chatId: this.props.currentChat.id,
					},
				})
					.then(() => {
						chatRequester.getChatUsers(this.props.currentChat.id)
							.then((data: XMLHttpRequest) => {
								this.props.currentChat.contacts = JSON.parse(data.response);
								this.setProps(this.props);
							})
							.catch(data => console.log(JSON.parse(data.response)));
					})
					.catch(data => console.log(JSON.parse(data.response)));
			})
			.catch(data => console.log(JSON.parse(data.response)));
	}

	_deleteUserFromChat(event: Event) {
		chatRequester.deleteUsersFromChat({
			data: {
				users: [
					event.target!.parentElement.id,
				],
				chatId: this.props.currentChat.id,
			},
		})
			.then(() => {
				chatRequester.getChatUsers(this.props.currentChat.id)
					.then((data: XMLHttpRequest) => {
						this.props.currentChat.contacts = JSON.parse(data.response);
						this.setProps(this.props);
					})
					.catch(data => console.log(JSON.parse(data.response)));
			})
			.catch(data => console.log(JSON.parse(data.response)));
	}

	componentDidMount() {
		authRequester.getUser()
			.then((data: XMLHttpRequest) => {
				this.props.userData = JSON.parse(data.response);
				chatRequester.getChats()
					.then((data: XMLHttpRequest) => {
						this._setChatsToProps(data);
						this.setProps(this.props);
					})
					.catch(data => console.log(JSON.parse(data.response)));
			})
			.catch(() => router.go('/'));
	}

	_setChatsToProps(data: XMLHttpRequest) {
		const chats: {
			avatar: string,
			// eslint-disable-next-line camelcase
			created_by: number,
			id: number,
			// eslint-disable-next-line camelcase
			last_message: {},
			title: string,
			// eslint-disable-next-line camelcase
			unread_count: number
		}[] = JSON.parse(data.response);
		this.props.contacts = {};
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
			deleteUserButton: this.props.deleteUserButton.render(),
			deleteChatButton: this.props.deleteChatButton.render(),
			addUserButton: this.props.addUserButton.render(),
			newChatInput: this.props.newChatInput.render(),
			addUserInput: this.props.addUserInput.render(),
			currentChat: this.props.currentChat,
			image: this.props.image,
			contact: this.props.contact,
			contactsMarkUp: this.props.contactsMarkUp,
			addChatVisible: this.props.addChatVisible,
			chatSettingsVisible: this.props.chatSettingsVisible,
			userData: this.props.userData,
		});
	}
}
