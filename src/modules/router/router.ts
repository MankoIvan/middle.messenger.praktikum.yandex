import Route from './route';

export default class Router {
	routes: Route[];
	history: History;
	_currentRoute: Route | null | undefined;
	_rootQuery: string;
	static __instance: Router;

	constructor(rootQuery: string) {
		if (Router.__instance) {
			// eslint-disable-next-line no-constructor-return
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: string, block: any) {
		const route = new Route(pathname, block, {rootQuery: this._rootQuery});
		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = () => {
			this._onRoute(window.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (!route) {
			return this.go('/404');
		}

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route!.render();
	}

	go(pathname: string) {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history.back();
		this._onRoute(window.location.pathname);
	}

	forward() {
		this.history.forward();
		this._onRoute(window.location.pathname);
	}

	getRoute(pathname: string) {
		return this.routes.find(route => route.match(pathname));
	}
}
