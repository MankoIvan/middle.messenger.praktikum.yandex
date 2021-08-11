import Block from '../block';

export default class Route {
	_pathname: string;
	_blockClass: any;
	_block: Block | null;
	_props: { [key: string]: any };

	constructor(pathname: string, view: any, props: {}) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname: string) {
		return pathname === this._pathname;
	}

	render() {
		if (!this._block) {
			this._block = new this._blockClass();
			this._render(this._props.rootQuery, this._block!);
			return;
		}

		this._block.show();
	}

	_render(query: string, block: Block) {
		const root = document.getElementById(query);
		// Root.innerHTML = '';
		root!.appendChild(block.getContent());
		return root;
	}
}
