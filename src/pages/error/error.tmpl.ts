import { button } from "../../modules/button/button";

const errorTmpl = `
    <div class="error">
        <h1 class="error__code">{{code}}</h1>
        <p class="error__message">{{message}}</p>
        ${button({
          text: "Назад к чатам",
          type: 'button',
          style: 'main',
        })}
    </div>
`;
export { errorTmpl };
