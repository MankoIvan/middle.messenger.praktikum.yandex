import Handlebars from "handlebars";

import { errorTmpl } from "./error.tmpl";

const template = Handlebars.compile(errorTmpl);

const error = function (params: { code: string; message: string }) {
  return template(params);
};

export { error };
