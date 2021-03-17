const { Room } = require("../modules/room");
const { User } = require("../modules/user");

const room = new Room("123456", "Admin Room");
room.invite(new User({ id: "123456" }, "admin"))

roomList = [
    room
];


