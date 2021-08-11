import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {FormPiece} from '../../components/formPiece/formPiece';
import {chatTmpl} from './chat.tmpl';
import {validateInput} from '../../modules/validation/validation';

export class Chat extends Block {
	constructor() {
		super('layout', {
			emailInput: new FormPiece({
				name: 'email',
				label: 'Почта',
				type: 'email',
			}),
			loginInput: new FormPiece({
				name: 'login',
				label: 'Логин',
				type: 'text',
			}),
			firstNameInput: new FormPiece({
				name: 'first_name',
				label: 'Имя',
				type: 'text',
			}),
			secondNameInput: new FormPiece({
				name: 'second_name',
				label: 'Фамилия',
				type: 'text',
			}),
			phoneInput: new FormPiece({
				name: 'phone',
				label: 'Телефон',
				type: 'tel',
			}),
			chatName: new FormPiece({
				name: 'chat_name',
				label: 'Имя в чате',
				type: 'text',
			}),
			saveButton: new Button({
				id: 'saveButton',
				text: 'Сохранить',
				type: 'submit',
				style: 'main',
			}),
			changePasswordButton: new Button({
				id: 'changePasswordButton',
				text: 'Изменить пароль',
				type: 'button',
				style: 'main',
			}),
			exitButton: new Button({
				id: 'exitButton',
				text: 'Выйти из профиля',
				type: 'button',
				style: 'alert',
			}),
			backButton: new Button({
				id: 'backButton',
				text: 'Назад к чатам',
				type: 'button',
				style: 'main',
			}),
			events: {
				click: (event: Event) => this.clickHandler(event),
				focusout: (event: Event) => this.validateOnBlur(event),
			},
		});
	}

	validateOnBlur(event: Event) {
		const eventTarget = <HTMLInputElement>event.target;
		if (eventTarget.nodeName === 'INPUT') {
			validateInput({
				value: eventTarget.value,
				type: eventTarget.name,
				errorMsgSelecor: `${eventTarget.id}ErrMessage`,
			});
		}
	}

	clickHandler(event: Event) {
		if (
			event.target === document.getElementById(this.props.saveButton.props.id)
		) {
			const form = document.forms.namedItem('userForm');
			const formData: { [key: string]: string } = {};
			const formDataArray = Array.from(form!.elements) as HTMLInputElement[];
			formDataArray.forEach(element => {
				validateInput({
					value: element.value,
					type: element.name,
					errorMsgSelecor: `${element.id}ErrMessage`,
				});
				formData[element.id] = element.value;
			});
			console.log(formData);
		}
	}

	render() {
		const template = Handlebars.compile(chatTmpl);
		return template({
			emailInput: this.props.emailInput.render(),
			loginInput: this.props.loginInput.render(),
			firstNameInput: this.props.firstNameInput.render(),
			secondNameInput: this.props.secondNameInput.render(),
			phoneInput: this.props.phoneInput.render(),
			chatName: this.props.chatName.render(),
			saveButton: this.props.saveButton.render(),
			changePasswordButton: this.props.changePasswordButton.render(),
			exitButton: this.props.exitButton.render(),
			backButton: this.props.backButton.render(),
		});
	}
}
