import Handlebars from "handlebars";

import { formPieceTmpl } from "./formPiece.tmpl";

const template = Handlebars.compile(formPieceTmpl);

const formPiece = function (params: {
  name: string;
  label: string;
  type: string;
  message?: string;
}) {
  return template(params);
};

export { formPiece };
