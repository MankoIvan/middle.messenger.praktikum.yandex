import "./index.scss";

import { Error } from "./pages/error/error";
import { Authorize } from "./pages/authorize/authorize";
import { Register } from "./pages/register/register";
import { User } from "./pages/user/user";

const root = <HTMLElement>document.querySelector("#root");

const path = window.location.pathname;

switch (path) {
  case "/authorize":
    const authorizePage = new Authorize();
    root.appendChild(authorizePage.getContent());
    break;
  case "/user":
    const userPage = new User();
    root.appendChild(userPage.getContent());
    break;
  case "/register":
    const registerPage = new Register();
    root.appendChild(registerPage.getContent());
    break;
  case "/":
    const pageMain = new Error({
      code: "Упс...",
      message: "Страницы пока нет, но уже скоро она появится",
    });
    root.appendChild(pageMain.getContent());
    break;
  case "/500":
    const page505 = new Error({ code: "500", message: "Мы уже фиксим" });
    root.appendChild(page505.getContent());
    break;
  default:
    const page404 = new Error({ code: "404", message: "Не туда попали" });
    root.appendChild(page404.getContent());
}
