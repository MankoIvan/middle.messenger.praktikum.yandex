import Handlebars from 'handlebars';
import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {FormPiece} from '../../components/formPiece/formPiece';
import {registerTmpl} from './register.tmpl';
import {validateInput} from '../../modules/validation/validation';
import Router from '../../modules/router/router';
import {authRequester} from '../../modules/api/auth-api';

const router = new Router('root');
const addSelector = 'reg';

export class Register extends Block {
	constructor() {
		super('layout', {
			emailInput: new FormPiece({
				name: 'email',
				label: 'Почта',
				type: 'email',
				addSelector,
			}),
			loginInput: new FormPiece({
				name: 'login',
				label: 'Логин',
				type: 'text',
				addSelector,
			}),
			firstNameInput: new FormPiece({
				name: 'first_name',
				label: 'Имя',
				type: 'text',
				addSelector,
			}),
			secondNameInput: new FormPiece({
				name: 'second_name',
				label: 'Фамилия',
				type: 'text',
				addSelector,
			}),
			phoneInput: new FormPiece({
				name: 'phone',
				label: 'Телефон',
				type: 'tel',
				addSelector,
			}),
			passwordInput: new FormPiece({
				name: 'password',
				label: 'Пароль',
				type: 'password',
				addSelector,
			}),
			passwordCheckInput: new FormPiece({
				name: 'password_check',
				label: 'Пароль (еще раз)',
				type: 'password',
				addSelector,
			}),
			regRegisterButton: new Button({
				id: 'regRegisterButton',
				text: 'Зарегистрироваться',
				type: 'submit',
				style: 'main',
			}),
			regAuthorizeButton: new Button({
				id: 'regAuthorizeButton',
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
				errorMsgSelecor: `${addSelector}${eventTarget.id}ErrMessage`,
			});
		}
	}

	clickHandler(event: Event) {
		if (
			event.target
			=== document.getElementById(this.props.regRegisterButton.props.id)
		) {
			this._registerButtonFunc();
		} else if (
			event.target
      === document.getElementById(this.props.regAuthorizeButton.props.id)
		) {
			router.go('/');
		}
	}

	_registerButtonFunc() {
		let valid: Boolean = true;
		const form = document.forms.namedItem('registerForm');
		const formData: {[key: string]: string} = {};
		const formDataArray = Array.from(form!.elements) as HTMLInputElement[];
		formDataArray.forEach(element => {
			valid = validateInput({
				value: element.value,
				type: element.name,
				errorMsgSelecor: `${addSelector}${element.id}ErrMessage`,
			}) ? valid : false;
			formData[element.id] = element.value;
		});
		if (formData.password !== formData.password_check) {
			valid = false;
			document.getElementById(`${addSelector}password_checkErrMessage`)!.innerText
				= 'Пароли не совпадают';
		}

		if (valid) {
			authRequester.signUp({
				data: formData,
			})
				.then(() => router.go('/messenger'))
				.catch(data => console.log(JSON.parse(data.response)));
		}
	}

	componentDidMount() {
		authRequester.getUser()
			.then((res:XMLHttpRequest) => {
				if (res.status === 200) {
					router.go('/messenger');
				}
			})
			.catch(data => console.log(JSON.parse(data.response)));
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
			regRegisterButton: this.props.regRegisterButton.render(),
			regAuthorizeButton: this.props.regAuthorizeButton.render(),
		});
	}
}
