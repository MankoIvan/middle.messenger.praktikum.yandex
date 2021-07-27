import Handlebars from "handlebars";
import Block from "../../modules/block";
import { buttonTmpl } from "./button.tmpl";

export class Button extends Block {
  constructor(props: { text: string; type: string; style?: string }) {
    super("container", props);
  }
  render() {
    const template = Handlebars.compile(buttonTmpl);
    this.props.style = this.props.style ? `button_${this.props.style}` : "";
    return template(this.props);
  }
}
