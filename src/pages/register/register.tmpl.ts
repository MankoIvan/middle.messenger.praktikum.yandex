import { formPiece } from "../../modules/input/formPiece";
import { button } from "../../modules/button/button";

const registerTmpl = `
    <div class="form">
        <h1 class="form__title">Регистрация</h1>
        <form class="form__container">
            ${formPiece({
              name: "email",
              label: "Почта",
              type: "email",
              message: "Неправильный формат почты",
            })}
            ${formPiece({
              name: "login",
              label: "Логин",
              type: "text",
              message: "Данный логин уже занят",
            })}
            ${formPiece({
              name: "first_name",
              label: "Имя",
              type: "text",
              message: "Неправильный формат имени",
            })}
            ${formPiece({
              name: "second_name",
              label: "Фамилия",
              type: "text",
              message: "Неправильный формат фамилии",
            })}
            ${formPiece({
              name: "phone",
              label: "Телефон",
              type: "tel",
              message: "Неправильный формат телефона",
            })}
            ${formPiece({
              name: "password",
              label: "Пароль",
              type: "password",
              message: "Неправильный формат пароля",
            })}
            ${formPiece({
              name: "password_check",
              label: "Пароль (еще раз)",
              type: "password",
              message: "Пароли не совпадают",
            })}
        </form>
            <div class="form__buttons">
            ${button({
              text: "Зарегистрироваться",
              type: 'submit',
              style: 'main',
            })}
            ${button({
              text: "Войти",
              type: 'button',
            })}
        </div>
    </div>
`;
export { registerTmpl };
