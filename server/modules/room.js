class Room {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this.userList = [];

        this.invite = function (user) {
            this.userList.push(user);
        }

        this.remove = function (user) {
            this.userList.splice(this.userList.indexOf(user), 1);
        }
    }

    get id () {
        return this._id;
    }

    get name () {
        return this._name;
    }

    findUser (id) {
        return this.userList.find(user => user._id === id);
    }

    getUserObjectList () {
        return this.userList;
    }

    getUserList () {
        let users = [];
        this.userList.forEach(user => users.push({
            _id: user.id,
            name: user.name,
        }));
        return users;
    }
}

module.exports.Room = Room;
