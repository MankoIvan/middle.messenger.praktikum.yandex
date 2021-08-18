export default class socketModule {
	static __instance: socketModule;
	socket: WebSocket;

	constructor(userId: string, chatId: string, token: string) {
		this.socket?.close();
		this.socket = new WebSocket(
			`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
		);
		this.socket.addEventListener('open', this.onOpen.bind(this));
		this.socket.addEventListener('close', this.onClose.bind(this));
		this.socket.addEventListener('message', this.onMessage.bind(this));
		this.socket.addEventListener('error', this.onError.bind(this));

		if (socketModule.__instance) {
			return socketModule.__instance;
		}

		socketModule.__instance = this;
	}

	send(message: {content: string, type: string}) {
		this.socket?.send(JSON.stringify(message));
	}

	onOpen() {
		console.log('Соединение установлено');
		this.send({
			content: '0',
			type: 'get old',
		});
	}

	onMessage(event: any) {
		console.log('Получены данные', event.data);
		return JSON.parse(event.data);
	}

	onError(event: any) {
		console.log('Ошибка: ', event.message);
	}

	onClose(event: any) {
		if (event.wasClean) {
			console.log('Соединение закрыто чисто');
		} else {
			console.log('Обрыв соединения');
		}

		console.log(`Код: ${event.code} | Причина: ${event.reason}`);
	}
}
