import Handlebars from "handlebars";
import Block from "../../modules/block";
import { Button } from "../../components/button/button";
import { errorTmpl } from "./error.tmpl";

export class Error extends Block {
  constructor(props: { code: string; message: string;}) {
    super("container", {
      backButton: new Button({
        text: "Назад к чатам",
        type: 'button',
        style: 'main',
      }),
      ...props
    });
  }
  render() {
    const template = Handlebars.compile(errorTmpl);
    return template({
      backButton: this.props.backButton.render(),
      code: this.props.code,
      message: this.props.message
    });
  }
}