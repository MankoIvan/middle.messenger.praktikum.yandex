import Handlebars from "handlebars";
import Block from "../../modules/block";
import { formPieceTmpl } from "./formPiece.tmpl";

export class FormPiece extends Block {
  constructor(props: {
    name: string;
    label: string;
    type: string;
    message?: string;
  }) {
    super("container", props);
  }
  render() {
    const template = Handlebars.compile(formPieceTmpl);
    return template(this.props);
  }
}