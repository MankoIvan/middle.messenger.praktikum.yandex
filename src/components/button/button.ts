import Handlebars from "handlebars";
import Block from "../../modules/block";
import { buttonTmpl } from "./button.tmpl";

export class Button extends Block {
  constructor(props: {
    id: string;
    text: string;
    type?: string;
    style?: string;
  }) {
    props.style = props.style ? `button_${props.style}` : "";
    super("div", props);
  }
  render() {
    const template = Handlebars.compile(buttonTmpl);
    return template(this.props);
  }
}
