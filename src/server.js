import Server from 'socket.io';

export function startServer(store) {
	const io = new Server().attach(8080);

	console.log("socket io server started on port 8090 %o", io);

	store.subscribe(
		() => io.emit('state', store.getState().toJS())
	);

	io.on('connection', (socket) => {
		socket.emit('state', store.getState().toJS());
		socket.on('action', store.dispatch.bind(store));			
	});

}
