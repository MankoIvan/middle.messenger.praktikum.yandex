import Handlebars from "handlebars";

import { authorizeTmpl } from "./authorize.tmpl"
const template = Handlebars.compile(authorizeTmpl);

const authorize = function(params) {
    return template(params)
}

export { authorize };