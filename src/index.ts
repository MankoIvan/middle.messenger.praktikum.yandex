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
    root.innerHTML = authorizePage.render();
    break;
  case "/user":
    const userPage = new User();
    root.innerHTML = userPage.render();
    break;
  case "/register":
    const registerPage = new Register();
    root.innerHTML = registerPage.render();
    break;
  case "/":
    const pageMain = new Error({
      code: "Упс...",
      message: "Страницы пока нет, но уже скоро она появится",
    });
    root.innerHTML = pageMain.render();
    break;
  case "/500":
    const page505 = new Error({ code: "500", message: "Мы уже фиксим" });
    root.innerHTML = page505.render();
    break;
  default:
    const page404 = new Error({ code: "404", message: "Не туда попали" });
    root.innerHTML = page404.render();
}
