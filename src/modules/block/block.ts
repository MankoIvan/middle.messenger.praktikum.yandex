import EventBus from '../eventBus';

export default class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	eventBus: () => EventBus;
	props: {[key: string]: any};
	_meta: {tagName: string; props: {[key: string]: any}};
	_element: HTMLElement;

	// _element = null;

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */

	constructor(tagName: string = 'div', props: {} = {}) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		const {tagName} = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	_createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidMount() {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount() {}

	_componentDidUpdate(
		oldProps: {[key: string]: any},
		newProps: {[key: string]: any},
	) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}

		this._render();
	}

	componentDidUpdate(
		oldProps: {[key: string]: any},
		newProps: {[key: string]: any},
	) {
		return oldProps !== newProps;
	}

	setProps = (nextProps: {[key: string]: any}) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	_render() {
		const block: string = this.render();
		this._removeEvents();
		this._element.innerHTML = block;
		this._addEvents();
	}

	render(): string {
		return '';
	}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: {}) {
		return new Proxy(props, {
			get(target: {[key: string]: any}, prop: string) {
				if (prop.indexOf('_') === 0) {
					throw new Error('Отказано в доступе');
				}

				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target: {[key: string]: any[]}, prop: string, value: any) => {
				if (prop.indexOf('_') === 0) {
					throw new Error('Нет прав');
				}

				target[prop] = value;
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет прав');
			},
		});
	}

	show() {
		this.getContent().style.display = 'flex';
	}

	hide() {
		this.getContent().style.display = 'none';
	}

	_addEvents() {
		const {events = {}} = this.props;

		Object.keys(events).forEach(eventName => {
			this._element.addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents() {
		const {events = {}} = this.props;

		Object.keys(events).forEach(eventName => {
			this._element.removeEventListener(eventName, events[eventName]);
		});
	}
}
