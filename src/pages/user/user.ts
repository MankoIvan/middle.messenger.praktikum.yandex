import Handlebars from "handlebars";
import Block from "../../modules/block";
import { Button } from "../../components/button/button";
import { FormPiece } from "../../components/formPiece/formPiece";
import { userTmpl } from "./user.tmpl";

export class User extends Block {
  constructor() {
    super("div", {
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
      chatName: new FormPiece({
        name: "chat_name",
        label: "Имя в чате",
        type: "text",
        message: "Неправильный формат имени",
      }),
      saveButton: new Button({
        id: "saveButton",
        text: "Сохранить",
        type: 'submit',
        style: 'main',
      }),
      changePasswordButton: new Button({
        id: "changePasswordButton",
        text: "Изменить пароль",
        type: 'button',
        style: 'main',
      }),
      goBackButton: new Button({
        id: "goBackButton",
        text: "Выйти",
        type: 'button',
        style: 'alert',
      })
    });
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
      saveButton: this.props.saveButton.render(),
      changePasswordButton: this.props.changePasswordButton.render(),
      goBackButton: this.props.goBackButton.render()
    });
  }
}
