import {regExps, errorMessages} from './validationConsts';

export function validateInput(params: {
	value: string;
	type: string;
	errorMsgSelecor: string;
}) {
	let valid: Boolean = false;
	const {value, type, errorMsgSelecor} = params;
	const errorMsgContainer = document.getElementById(errorMsgSelecor);
	errorMsgContainer!.innerText = '';

	switch (type) {
		case 'login':
			valid = regExps.login.test(value);
			errorMsgContainer!.innerText = valid ? '' : errorMessages.login;
			break;
		case 'password':
		case 'password_check':
		case 'password_old':
			valid = regExps.password.test(value);
			errorMsgContainer!.innerText = valid ? '' : errorMessages.password;
			break;
		case 'email':
			valid = regExps.email.test(value);
			errorMsgContainer!.innerText = valid ? '' : errorMessages.email;
			break;
		case 'first_name':
		case 'second_name':
		case 'display_name':
			valid = regExps.name.test(value);
			errorMsgContainer!.innerText = valid ? '' : errorMessages.name;
			break;
		case 'phone':
			valid = regExps.phone.test(value);
			errorMsgContainer!.innerText = valid ? '' : errorMessages.phone;
			break;
		case 'chatName':
			valid = regExps.chatName.test(value);
			errorMsgContainer!.innerText = valid ? '' : errorMessages.chatName;
			break;
		default:
			valid = false;
	}

	return valid;
}
