class User {
    constructor(socket, name) {
        this._id = socket.id;
        this._name = name;
        this.socket = socket;
    }

    get id () {
        return this._id;
    }

    set id (socketid) {
        this._id = socketid;
    }

    get name () {
        return this._name;
    }
}

module.exports.User = User;