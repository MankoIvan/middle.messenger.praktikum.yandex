import { formPiece } from "../../modules/input/formPiece";

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
            <button class="button_main" type="submit">Авторизоваться</button>
            <button class="button" type="button">Нет аккаунта?</button>
        </div>
    </div>
`;
export { authorizeTmpl };
