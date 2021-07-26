import Handlebars from "handlebars";

import { buttonTmpl } from "./button.tmpl";

const template = Handlebars.compile(buttonTmpl);

const button = function (params: {
  text: string;
  type: string;
  style?: string;
}) {
  params.style = params.style ? `button_${params.style}` : "";
  return template(params);
};

export { button };
