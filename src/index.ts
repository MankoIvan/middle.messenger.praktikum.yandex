import "./index.scss";

import { error } from "./pages/error/error";
import { authorize } from "./pages/authorize/authorize";
import { register } from "./pages/register/register";
import { user } from "./pages/user/user";


const root = <HTMLElement>document.querySelector("body");

const path = window.location.pathname;

switch (path) {
  case "/authorize":
    root.innerHTML = authorize({});
    break;
  case "/user":
    root.innerHTML = user({});
    break;
  case "/register":
    root.innerHTML = register({});
    break;
  case "/":
    root.innerHTML = error({
      code: "Упс...",
      message: "Страницы пока нет, но уже скоро она появится",
    });
    break;
  case "/500":
    root.innerHTML = error({ code: "500", message: "Мы уже фиксим" });
    break;
  default:
    root.innerHTML = error({ code: "404", message: "Не туда попали" });
}
