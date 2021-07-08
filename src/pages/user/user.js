import Handlebars from "handlebars";

import { userTmpl } from "./user.tmpl"
const template = Handlebars.compile(userTmpl);

const user = function(params) {
    return template(params)
}

export { user };