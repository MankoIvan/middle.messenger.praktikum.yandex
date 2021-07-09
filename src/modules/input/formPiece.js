import Handlebars from "handlebars";

import { formPieceTmpl } from "./formPiece.tmpl"

const template = Handlebars.compile(formPieceTmpl);

const formPiece = function(params) {
    return template(params)
}

export { formPiece };