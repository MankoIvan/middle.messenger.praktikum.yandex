import { formPiece } from "../../components/input/formPiece";
import { button } from "../../components/button/button";

const userTmpl = `
    <div class="form">
        <h1 class="form__title">Профиль</h1>
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
            ${button({
              text: "Сохранить",
              type: 'submit',
              style: 'main',
            })}
            ${button({
              text: "Изменить пароль",
              type: 'button',
              style: 'alert',
            })}
            ${button({
              text: "Назад",
              type: 'button',
            })}
        </div>
    </div>
`;
export { userTmpl };
