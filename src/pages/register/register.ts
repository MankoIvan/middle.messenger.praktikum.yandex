import Handlebars from "handlebars";
import Block from "../../modules/block";
import { Button } from "../../components/button/button";
import { FormPiece } from "../../components/formPiece/formPiece";
import { registerTmpl } from "./register.tmpl";

export class Register extends Block {
  constructor() {
    super("container", {
      emailInput: new FormPiece({
        name: "email",
        label: "Почта",
        type: "email",
        message: "Неправильный формат почты",
      }),
      loginInput: new FormPiece({
        name: "login",
        label: "Логин",
        type: "text",
        message: "Данный логин уже занят",
      }),
      firstNameInput: new FormPiece({
        name: "first_name",
        label: "Имя",
        type: "text",
        message: "Неправильный формат имени",
      }),
      secondNameInput: new FormPiece({
        name: "second_name",
        label: "Фамилия",
        type: "text",
        message: "Неправильный формат фамилии",
      }),
      phoneInput: new FormPiece({
        name: "phone",
        label: "Телефон",
        type: "tel",
        message: "Неправильный формат телефона",
      }),
      passwordInput: new FormPiece({
        name: "password",
        label: "Пароль",
        type: "password",
        message: "Неправильный формат пароля",
      }),
      passwordCheckInput: new FormPiece({
        name: "password_check",
        label: "Пароль (еще раз)",
        type: "password",
        message: "Пароли не совпадают",
      }),
      registerButton: new Button({
        text: "Зарегистрироваться",
        type: 'submit',
        style: 'main',
      }),
      authorizeButton: new Button({
        text: "Войти",
        type: 'button',
      })
    });
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
      authorizeButton: this.props.authorizeButton.render()
    });
  }
}
