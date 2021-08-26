import Handlebars from 'handlebars';
import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {FormPiece} from '../../components/formPiece/formPiece';
import {passwordTmpl} from './password.tmpl';
import {validateInput} from '../../modules/validation/validation';
import Router from '../../modules/router/router';
import {authRequester} from '../../modules/api/auth-api';
import {userRequester} from '../../modules/api/user-api';

const router = new Router('root');

const addSelector = 'password';
export class Password extends Block {
	constructor() {
		super('layout', {
			passwordOldInput: new FormPiece({
				name: 'password_old',
				label: 'Пароль',
				type: 'password',
				addSelector,
			}),
			passwordNewInput: new FormPiece({
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

			passwordSaveButton: new Button({
				id: 'passwordSaveButton',
				text: 'Сохранить',
				type: 'submit',
				style: 'alert',
			}),
			passwordBackButton: new Button({
				id: 'passwordBackButton',
				text: 'Назад к настройкам',
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
				errorMsgSelecor: `${addSelector}${eventTarget.id}ErrMessage`,
			});
		}
	}

	clickHandler(event: Event) {
		if (
			event.target === document.getElementById(this.props.passwordSaveButton.props.id)
		) {
			this._changePasswordButtonFun();
		} else if (
			event.target
      === document.getElementById(this.props.passwordBackButton.props.id)
		) {
			router.go('/settings');
		}
	}

	_changePasswordButtonFun() {
		let valid: Boolean = true;
		const form = document.forms.namedItem('passwordForm');
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
		if (formData.password !== formData.password_check) {
			valid = false;
			document.getElementById(`${addSelector}password_checkErrMessage`)!.innerText
				= 'Пароли не совпадают';
		}

		if (valid) {
			userRequester.changeUserPassword({
				data: {
					oldPassword: formData.password_old,
					newPassword: formData.password,
				},
			})
				.then(() => router.go('/settings'))
				.catch(data => console.log(JSON.parse(data.response)));
		}
	}

	componentDidMount() {
		authRequester.getUser()
			.catch(() => router.go('/'));
	}

	render() {
		const template = Handlebars.compile(passwordTmpl);
		return template({
			passwordOldInput: this.props.passwordOldInput.render(),
			passwordNewInput: this.props.passwordNewInput.render(),
			passwordCheckInput: this.props.passwordCheckInput.render(),
			passwordSaveButton: this.props.passwordSaveButton.render(),
			passwordBackButton: this.props.passwordBackButton.render(),
		});
	}
}
