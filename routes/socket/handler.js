module.exports = (io, namespace) => {
        let nsp = io.of(namespace);
        let users = 0;
        nsp.on('connection', (socket) => {
                let addedUser = false;
                socket.on('new message', (data) => {
                        socket.broadcast.emit('new message', {
                                username: socket.username,
                                message:data
                        });
                });

                socket.on('add user', (username) => {
                        if(addedUser) return;

                        socket.username = username;
                        users++;
                        addedUser = true;
                        socket.emit('login', {
                                users: users
                        });

                        socket.broadcast.emit('user joined', {
                                username: socket.username,
                                users: users
                        });
                });

                socket.on('typing', () => {
                        socket.broadcast.emit('typing', {
                                username: socket.username
                        });
                });

                socket.on('stop typing', () => {
                        socket.broadcast.emit('stop typing', {
                                username: socket.username
                        });
                });

                socket.on('disconnect', () => {
                        if(addedUser) {
                                users--;
                                socket.broadcast.emit('user left', {
                                        username: socket.username,
                                        users: users
                                });
                        }
                });
        });
};
