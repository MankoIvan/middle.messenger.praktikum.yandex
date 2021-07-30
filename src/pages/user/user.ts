import Handlebars from "handlebars";
import Block from "../../modules/block";
import { Button } from "../../components/button/button";
import { FormPiece } from "../../components/formPiece/formPiece";
import { userTmpl } from "./user.tmpl";
import { validateInput } from "../../modules/validation";

export class User extends Block {
  constructor() {
    super("div", {
      emailInput: new FormPiece({
        name: "email",
        label: "Почта",
        type: "email",
      }),
      loginInput: new FormPiece({
        name: "login",
        label: "Логин",
        type: "text",
      }),
      firstNameInput: new FormPiece({
        name: "first_name",
        label: "Имя",
        type: "text",
      }),
      secondNameInput: new FormPiece({
        name: "second_name",
        label: "Фамилия",
        type: "text",
      }),
      phoneInput: new FormPiece({
        name: "phone",
        label: "Телефон",
        type: "tel",
      }),
      chatName: new FormPiece({
        name: "chat_name",
        label: "Имя в чате",
        type: "text",
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
      }),
      events: {
        click: (event: Event) => this.clickHandler(event),
        focusout: (event: Event) => this.validateOnBlur(event),
      },
    });
  }
  validateOnBlur(event: Event) {
    const eventTarget = <HTMLInputElement>event.target;
    if (eventTarget.nodeName === "INPUT") {
      validateInput({
        value: eventTarget.value,
        type: eventTarget.name,
        errorMsgSelecor: `${eventTarget.id}ErrMessage`,
      });
    }
  }
  clickHandler(event: Event) {
    if (
      event.target ===
      document.getElementById(this.props.saveButton.props.id)
    ) {
      const form = document.forms.namedItem("userForm");
      const formData: { [key: string]: string } = {};
      const formDataArray = Array.from(form!.elements) as HTMLInputElement[];
      formDataArray.forEach((element) => {
        validateInput({
          value: element.value,
          type: element.name,
          errorMsgSelecor: `${element.id}ErrMessage`,
        })
        formData[element.id] = element.value;
      });
      console.log(formData);
    }
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
