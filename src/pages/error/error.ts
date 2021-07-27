import Handlebars from "handlebars";
import Block from "../../modules/block";
import { errorTmpl } from "./error.tmpl";

class Error extends Block {
  constructor() {
    super("container", { code: string, message: string });
  }
}





const template = Handlebars.compile(errorTmpl);

const error = function (params: { code: string; message: string }) {
  return template(params);
};

export { error };
