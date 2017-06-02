module.exports = (io) => {
        let users = 0;
        io.on('connection', (sckt) => {
                let addedUser = false;
                sckt.on('new message', (data) => {
                        sckt.broadcast.emit('new message', {
                                username: sckt.username,
                                message:data
                        });
                });

                sckt.on('add user', (username) => {
                        if(addedUser) return;

                        sckt.username = username;
                        users++;
                        addedUser = true;
                        sckt.emit('login', {
                                users: users
                        });

                        sckt.broadcast.emit('user joined', {
                                username: sckt.username,
                                users: users
                        });
                });

                sckt.on('typing', () => {
                        sckt.broadcast.emit('typing', {
                                username: sckt.username
                        });
                });

                sckt.on('stop typing', () => {
                        sckt.broadcast.emit('stop typing', {
                                username: sckt.username
                        });
                });

                sckt.on('disconnect', () => {
                        if(addedUser) {
                                users--;
                                sckt.broadcast.emit('user left', {
                                        username: sckt.username,
                                        users: users
                                });
                        }
                });
        });
};
