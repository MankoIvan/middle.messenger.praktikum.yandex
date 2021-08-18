import Handlebars from 'handlebars';
import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {FormPiece} from '../../components/formPiece/formPiece';
import {userTmpl} from './user.tmpl';
import {validateInput} from '../../modules/validation/validation';
import Router from '../../modules/router/router';
import {authRequester} from '../../modules/api/auth-api';
import {userRequester} from '../../modules/api/user-api';

const router = new Router('root');

const addSelector = 'user';
export class User extends Block {
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
			chatName: new FormPiece({
				name: 'display_name',
				label: 'Имя в чате',
				type: 'text',
				addSelector,
			}),
			userSaveButton: new Button({
				id: 'userSaveButton',
				text: 'Сохранить',
				type: 'submit',
				style: 'main',
			}),
			userChangePasswordButton: new Button({
				id: 'userChangePasswordButton',
				text: 'Изменить пароль',
				type: 'button',
				style: 'main',
			}),
			userExitButton: new Button({
				id: 'userExitButton',
				text: 'Выйти из профиля',
				type: 'button',
				style: 'alert',
			}),
			userBackButton: new Button({
				id: 'userBackButton',
				text: 'Назад к чатам',
				type: 'button',
				style: 'main',
			}),
			userData: {},
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
			event.target === document.getElementById(this.props.userSaveButton.props.id)
		) {
			let valid: Boolean = true;
			const form = document.forms.namedItem('userForm');
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
				userRequester.changeUserInfo({
					data: formData,
				})
					.then(() => router.go('/messenger'))
					.catch(data => console.log(JSON.parse(data.response)));
			}

			console.log(formData);
		} else if (
			event.target
      === document.getElementById(this.props.userBackButton.props.id)
		) {
			router.go('/messenger');
		} else if (
			event.target
      === document.getElementById(this.props.userExitButton.props.id)
		) {
			authRequester.logOut()
				.then(() => router.go('/'))
				.catch(data => console.log(JSON.parse(data.response)));
		}
	}

	componentDidMount() {
		authRequester.getUser()
			.then((data:XMLHttpRequest) => {
				this.props.userData = JSON.parse(data.response);
				this.props.emailInput.props.value = this.props.userData.email;
				this.props.loginInput.props.value = this.props.userData.login;
				this.props.firstNameInput.props.value = this.props.userData.first_name;
				this.props.secondNameInput.props.value = this.props.userData.second_name;
				this.props.phoneInput.props.value = this.props.userData.phone;
				this.props.chatName.props.value = this.props.userData.display_name;
				this.setProps(this.props);
			})
			.catch(() => router.go('/'));
	}

	render() {
		const template = Handlebars.compile(userTmpl);
		return template({
			emailInput: this.props.emailInput.render(),
			loginInput: this.props.loginInput.render(),
			firstNameInput: this.props.firstNameInput.render(),
			secondNameInput: this.props.secondNameInput.render(),
			phoneInput: this.props.phoneInput.render(),
			chatName: this.props.chatName.render(),
			userSaveButton: this.props.userSaveButton.render(),
			userChangePasswordButton: this.props.userChangePasswordButton.render(),
			userExitButton: this.props.userExitButton.render(),
			userBackButton: this.props.userBackButton.render(),
			userData: this.props.userData,
		});
	}
}
