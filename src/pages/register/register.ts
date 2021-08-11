import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {FormPiece} from '../../components/formPiece/formPiece';
import {registerTmpl} from './register.tmpl';
import {validateInput} from '../../modules/validation/validation';

export class Register extends Block {
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
			passwordInput: new FormPiece({
				name: 'password',
				label: 'Пароль',
				type: 'password',
			}),
			passwordCheckInput: new FormPiece({
				name: 'password_check',
				label: 'Пароль (еще раз)',
				type: 'password',
			}),
			registerButton: new Button({
				id: 'registerButton',
				text: 'Зарегистрироваться',
				type: 'submit',
				style: 'main',
			}),
			authorizeButton: new Button({
				id: 'authorizeButton',
				text: 'Войти',
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
			=== document.getElementById(this.props.registerButton.props.id)
		) {
			const form = document.forms.namedItem('registerForm');
			const formData: {[key: string]: string} = {};
			const formDataArray = Array.from(form!.elements) as HTMLInputElement[];
			formDataArray.forEach(element => {
				validateInput({
					value: element.value,
					type: element.name,
					errorMsgSelecor: `${element.id}ErrMessage`,
				});
				formData[element.id] = element.value;
			});
			if (formData.password !== formData.password_check) {
				document.getElementById('password_checkErrMessage')!.innerText
					= 'Пароли не совпадают';
			}

			console.log(formData);
		}
	}

	render() {
		const template = Handlebars.compile(registerTmpl);
		return template({
			emailInput: this.props.emailInput.render(),
			loginInput: this.props.loginInput.render(),
			firstNameInput: this.props.firstNameInput.render(),
			secondNameInput: this.props.secondNameInput.render(),
			phoneInput: this.props.phoneInput.render(),
			passwordInput: this.props.passwordInput.render(),
			passwordCheckInput: this.props.passwordCheckInput.render(),
			registerButton: this.props.registerButton.render(),
			authorizeButton: this.props.authorizeButton.render(),
		});
	}
}
