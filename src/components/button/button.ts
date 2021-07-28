import Handlebars from "handlebars";
import Block from "../../modules/block";
import { buttonTmpl } from "./button.tmpl";

export class Button extends Block {
  constructor(props: { text: string; type: string; style?: string }) {
    props.style = props.style ? `button_${props.style}` : "";
    super("container", props);
  }
  render() {
    const template = Handlebars.compile(buttonTmpl);
    return template(this.props);
  }
}
