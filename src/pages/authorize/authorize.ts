import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {FormPiece} from '../../components/formPiece/formPiece';
import {authorizeTmpl} from './authorize.tmpl';
import {validateInput} from '../../modules/validation/validation';
import Router from '../../modules/router/router';
import {authRequester} from '../../modules/api/auth-api';

const router = new Router('root');
const addSelector = 'auth';

export class Authorize extends Block {
	constructor() {
		super('layout', {
			loginInput: new FormPiece({
				name: 'login',
				label: 'Логин',
				type: 'text',
				addSelector,
			}),
			passwordInput: new FormPiece({
				name: 'password',
				label: 'Пароль',
				type: 'password',
				addSelector,
			}),
			authAuthorizeButton: new Button({
				id: 'authAuthorizeButton',
				text: 'Авторизоваться',
				type: 'submit',
				style: 'main',
			}),
			authRegisterButton: new Button({
				id: 'authRegisterButton',
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
				errorMsgSelecor: `${addSelector}${eventTarget.id}ErrMessage`,
			});
		}
	}

	clickHandler(event: Event) {
		if (
			event.target
			=== document.getElementById(this.props.authAuthorizeButton.props.id)
		) {
			let valid: Boolean = true;
			const form = document.forms.namedItem('authorizeForm');
			const formData: { [key: string]: string } = {};
			const formDataArray = Array.from(form!.elements) as HTMLInputElement[];
			formDataArray.forEach(element => {
				valid = validateInput({
					value: element.value,
					type: element.name,
					errorMsgSelecor: `${addSelector}${element.id}ErrMessage`,
				}) ? valid : false;
				formData[element.id] = element.value;
			});
			if (valid) {
				authRequester.signIn({
					data: formData,
				})
					.then(() => router.go('/messenger'))
					.catch(data => console.log(JSON.parse(data.response)));
			}
		} else if (
			event.target
			=== document.getElementById(this.props.authRegisterButton.props.id)
		) {
			router.go('/sign-up');
		}
	}

	render() {
		const template = Handlebars.compile(authorizeTmpl);
		return template({
			loginInput: this.props.loginInput.render(),
			passwordInput: this.props.passwordInput.render(),
			authAuthorizeButton: this.props.authAuthorizeButton.render(),
			authRegisterButton: this.props.authRegisterButton.render(),
		});
	}
}
