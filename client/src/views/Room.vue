<template>
  <div class="room">
    <Game />
    <div><h1>Welcome to {{roomName}}</h1></div>
    <UserList :userList="userList"/>
    <Chat :texts="texts" :roomId="roomId" :username="username"/>
  </div>
</template>

<script>
import Chat from '../components/Chat'
import UserList from '../components/UserList'
import Game from '../components/Game'


let username, roomId;
let roomName;

export default {
  name: 'Room',
  components: {
    Chat,
    UserList,
    Game
  },
  data() {
    return {
      username,
      roomId,
      roomName, 
      texts: [],
      userList: []
    }
  },
  sockets: {
    connect: function() {
      console.log("Connected to Room");
    },
    userList: function(data) {
      this.userList = data;
      console.log("Userlist: ", data);
    },
    joinedRoom: function(data) {
      this.roomName = data;
      document.title = this.roomName;
    },
    sendedText: function(data) {
        this.texts.push({
          username: data.username, 
          message: data.message, 
          time: data.time
        });
    },
    message: function (data) {
      console.log(data);
    }
  },
  created() {
    this.username = this.$route.query.username; 
    this.roomId = this.$route.query.roomId;

    this.$socket.emit("joinRoom", {roomId: this.roomId, username: this.username});
  },
  methods: {
      disconnect: function() {
        this.$socket.emit("leaveRoom", "");
      }
  }
}
</script>
