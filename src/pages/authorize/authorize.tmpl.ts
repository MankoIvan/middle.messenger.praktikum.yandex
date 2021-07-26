import { formPiece } from "../../components/input/formPiece";
import { button } from "../../components/button/button";

const authorizeTmpl = `
    <div class="form">
        <h1 class="form__title">Вход</h1>
        <form class="form__container">
            ${formPiece({
              name: "login",
              label: "Логин",
              type: "text",
              message: "Неверный логин",
            })}
            ${formPiece({
              name: "password",
              label: "Пароль",
              type: "password",
              message: "Неверный пароль",
            })}
        </form>
        <div class="form__buttons">
            ${button({
              text: "Авторизоваться",
              type: 'submit',
              style: 'main',
            })}
            ${button({
              text: "Нет аккаунта?",
              type: 'button',
            })}
        </div>
    </div>
`;
export { authorizeTmpl };
