import Handlebars from "handlebars";

import { registerTmpl } from "./register.tmpl";
const template = Handlebars.compile(registerTmpl);

const register = function (params: Object) {
  return template(params);
};

export { register };
