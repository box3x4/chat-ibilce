module.exports = (io, namespace, user) => {
  let nsp = io.of(namespace);
  let numUsers = 0;

  nsp.on('connection', (socket) => {
    let addedUser = false;

    socket.removeAllListeners();

    socket.on('new message', (data) => {

      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      });
    });

    socket.on('add user', (username) => {
      if (addedUser)
        return;

      socket.username = user.username;
      ++numUsers;
      addedUser = true;

      socket.emit('login', {
        numUsers: numUsers,
        username: socket.username
      });

      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
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

      if (addedUser) {
        --numUsers;

        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });
  });
};
