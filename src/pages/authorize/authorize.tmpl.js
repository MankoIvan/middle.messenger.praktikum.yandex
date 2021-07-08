import { formPiece } from "../../modules/input/formPiece";

const authorizeTmpl = `
    <div class="form">
        <p class="form__title">Вход</p>
        <form class="form__container">
         ${formPiece({name: "login", label: "Логин", type: "text", message: "Неверный логин"})}
            ${formPiece({name: "password", label: "Пароль", type: "password", message: "Неверный пароль"})}
        </form>
        <div class="form__buttons">
            <button class="button">Авторизоваться</button>
            <button class="button__alt">Нет аккаунта?</button>
        </div>
    </div>
`;
export { authorizeTmpl };