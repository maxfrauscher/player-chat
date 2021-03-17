<template>
  <div>
    <form id="login-form" @submit="checkForm" action="/room" >
      <div class="login-inside">
        <h1>LOGO HERE</h1>
        <div class="form-group row">
          <input style="width:100%;" autocomplete="off" name="username" class="form-control bs-top-left" id="username" type="text" placeholder="username *"/>
        </div>
        <hr>
        <div class="form-group row">
          <input name="roomname" autocomplete="off" class="form-control col bs-top-left " id="roomname" type="text" placeholder="room name"/>
          <span class="filler"></span>
          <label for="createRoom"  class="bs-top-left btn col">create room  <b-icon icon="cloud-plus-fill" font-scale="1" /></label>
          <input id="createRoom" value="" type="submit" />
        </div>
        <div class="form-group row">
        </div>
        <hr>
        <p>OR</p>
        <hr>
        <div class="form-group row">
          <input name="roomId" autocomplete="off" class="form-control col bs-top-left " id="roomId" type="text" value="" placeholder="room id"/>
          <input id="joinRoom" value="" type="submit" />
          <span class="filler"></span>
          <label for="joinRoom" class="btn bs-top-left col">join room  <b-icon icon="hdd-stack-fill" font-scale="1" /></label>
        </div>
        <div class=" info-box form-group row bs-top-left">
          <span class="col-2">
            <b-icon icon="info-circle-fill" style="margin:10px;" font-scale="2" />
          </span>
          <span class="col-10" style="text-align:left;padding:5px;">
            <p>You can either create a new room or join 
            an existing room with the room id.</p>
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import shortid from 'shortid'

export default {
    name: "LoginForm",
    sockets: {
      connect: function() {
        console.log("Connected to LoginForm");
      }
    },
    methods: {
      checkForm: function(e) {
        const username = e.target.querySelector('#username');
        let roomId = e.target.querySelector('#roomId');
        let roomName =  e.target.querySelector('#roomname');


        if(e.submitter.id === "createRoom") {
            if(username.value) {
              roomId.value = shortid.generate();
              this.$socket.emit("createRoom", {
                roomId: roomId.value,
                roomName: roomName.value
                });
              return;
            }
        }

        if(e.submitter.id === "joinRoom") {
            if(username.value && roomId.value) {
              return;
            } 
        }        
        e.preventDefault();
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-height: 800px) { 
 #login-form {
    -ms-transform: translateY(50%);
    transform: translateY(50%);
  }
}

@media (max-height: 800px) { 
 #login-form {
    -ms-transform: translateY(10%);
    transform: translateY(10%);
  }
}

#login-form {
    margin: 0 auto;
    width: 400px;
    padding: 5px;
    height: auto;
    text-align: center;
}

@supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input {
        -webkit-appearance: none;
        -moz-appearance: none;
    }
}

.filler {
  width: 5px;
}

h1 {
  text-align: center;
}

input[type="text"] {
  width:auto;
  padding: 5px;
  margin: 0;
  font-size: var(--input-font-size);
  height: auto;
  background: white;
}

input[type="submit"] {
  margin: 0;
  background: none;
  padding: 0;
  border: none;
}

.btn {
  background-color: var(--button-color-dark) !important;
  color: var(--button-color-light) !important;
}

label {
  margin: 0 !important;
  padding: 5px;
  font-size: var(--input-font-size);
  width: auto;
}

.login-inside {
    position: relative;
    display: table;
    margin: 0 auto;
    width: 100%;
}

.info-box {
  padding: 5px;
  background:  var(--background-color-light);
}

.info-box p {
  margin: 0;
}

</style>
