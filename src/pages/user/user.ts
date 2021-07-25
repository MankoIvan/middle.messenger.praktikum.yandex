import Handlebars from "handlebars";

import { userTmpl } from "./user.tmpl";
const template = Handlebars.compile(userTmpl);

const user = function (params: Object) {
  return template(params);
};

export { user };
