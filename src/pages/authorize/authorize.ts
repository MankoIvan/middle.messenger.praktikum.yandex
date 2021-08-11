import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {FormPiece} from '../../components/formPiece/formPiece';
import {authorizeTmpl} from './authorize.tmpl';
import {validateInput} from '../../modules/validation/validation';

export class Authorize extends Block {
	constructor() {
		super('layout', {
			loginInput: new FormPiece({
				name: 'login',
				label: 'Логин',
				type: 'text',
			}),
			passwordInput: new FormPiece({
				name: 'password',
				label: 'Пароль',
				type: 'password',
			}),
			authorizeButton: new Button({
				id: 'authorizeButton',
				text: 'Авторизоваться',
				type: 'submit',
				style: 'main',
			}),
			registerButton: new Button({
				id: 'registerButton',
				text: 'Нет аккаунта?',
				type: 'button',
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
			event.target
      === document.getElementById(this.props.authorizeButton.props.id)
		) {
			const form = document.forms.namedItem('authorizeForm');
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
		const template = Handlebars.compile(authorizeTmpl);
		return template({
			loginInput: this.props.loginInput.render(),
			passwordInput: this.props.passwordInput.render(),
			authorizeButton: this.props.authorizeButton.render(),
			registerButton: this.props.registerButton.render(),
		});
	}
}
