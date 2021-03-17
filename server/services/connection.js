const socketio = require('socket.io');
const moment = require('moment');
const { Room } = require('../modules/room');
const { User } = require('../modules/user');


module.exports = function (server) {
    const io = socketio(server);

    io.on('connection', socket => {

        // User creates a new room
        socket.on('createRoom', room => {
            console.log("ROOM CREATED", room.roomId);
            roomList.push(new Room(room.roomId, room.roomName));
        });

        // User joins a room via username, roomId
        socket.on('joinRoom', data => {
            // console.log(`User: ${data.username}, ${socket.id} joined Room: ${data.roomId}`);

            const user = new User(socket, data.username);
            const room = roomList.find(r => r.id === data.roomId);

            if (!room) return io.emit("message", "Room is offline.");
            // Join room
            socket.join(room.id);

            // Send Infos for roomdata
            io.to(room.id).emit("joinedRoom", room.name);

            //Admin info to all
            io.to(room.id).emit('sendedText', {
                username: "-- 🤖 --",
                message: `${user.name} joined the room`,
                time: ""
            });

            // Invite user to room
            room.invite(user);

            // Send current userlist to room
            io.to(room.id).emit("userList", room.getUserList());

            // Disconnect from Room
            socket.on('disconnect', () => {
                const user = room.findUser(socket.id);

                if (user) {
                    const msg = `${user.name} left ${room.id}`;
                    console.log(msg);
                    // Remove user from room
                    room.remove(user.id);

                    io.to(room.id).emit('message', msg);
                    io.to(room.id).emit("userList", room.getUserList());
                    //Admin info to all
                    io.to(room.id).emit('sendedText', {
                        username: "-- 🤖 --",
                        message: `${user.name} left the room`,
                        time: ""
                    });

                    socket.leave(room.id);
                }
            });
        });

        socket.on('sendText', (data) => {
            const user = new User(socket, data.username);
            const room = roomList.find(r => r.id === data.roomId);

            //set the time value
            data.time = moment(new Date()).format('hh:mm:ss');

            io.to(room.id).emit('sendedText', data);
        });
    });
}

