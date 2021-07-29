import Handlebars from "handlebars";
import Block from "../../modules/block";
import { Button } from "../../components/button/button";
import { FormPiece } from "../../components/formPiece/formPiece";
import { authorizeTmpl } from "./authorize.tmpl";

export class Authorize extends Block {
  constructor() {
    super("div", {
      loginInput: new FormPiece({
        name: "login",
        label: "Логин",
        type: "text",
        message: "Неверный логин",
      }),
      passwordInput: new FormPiece({
        name: "password",
        label: "Пароль",
        type: "password",
        message: "Неверный пароль",
      }),
      authorizeButton: new Button({
        text: "Авторизоваться",
        type: 'submit',
        style: 'main',
      }),
      registerButton: new Button({
        text: "Нет аккаунта?",
        type: 'button',
      })
    });
  }
  render() {
    const template = Handlebars.compile(authorizeTmpl);
    return template({
      loginInput: this.props.loginInput.render(),
      passwordInput: this.props.passwordInput.render(),
      authorizeButton: this.props.authorizeButton.render(),
      registerButton: this.props.registerButton.render()
    });
  }
}
