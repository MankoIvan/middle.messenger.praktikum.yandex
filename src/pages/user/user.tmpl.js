import { formPiece } from "../../modules/input/formPiece";

const userTmpl = `
    <div class="form">
        <p class="form__title">Профиль</p>
        <div class="form__userImg">
                <p class="form__userImg-coverText">Изменить<br>аватар</p>
        </div>
        <form class="form__container">
            ${formPiece({ name: "email", label: "Почта", type: "email" })}
            ${formPiece({ name: "login", label: "Логин", type: "text" })}
            ${formPiece({ name: "first_name", label: "Имя", type: "text" })}
            ${formPiece({
              name: "second_name",
              label: "Фамилия",
              type: "text",
            })}
            ${formPiece({ name: "phone", label: "Телефон", type: "tel" })}
            ${formPiece({
              name: "chat_name",
              label: "Имя в чате",
              type: "text",
            })}    
        </form>
        <div class="form__buttons">
            <button class="button button_main" type="submit">Сохранить</button>
            <button class="button button_alert" type="button">Изменить пароль</button>
            <button class="button" type="button">Назад</button>
        </div>
    </div>
`;
export { userTmpl };
