<template>
    <div class="chat">
        <div class="chat-box">
            <div class="chat-topbar" v-on:click="toggleChat">Chat Room</div>
            <div id="chat-wrap" class="hide">
                <div class="chat-content">
                        <ChatText 
                        v-for="text in texts" 
                        :key="text.key" 
                        :text="text" 
                        />
                </div>
                <form v-on:submit="sendText">
                    <div class="chat-input" >
                        <input id="messageText" autocomplete="off" value="" class="col-12 bs-top-left" type="text">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ChatText from './ChatText'



export default {
    props: ["texts", "roomId", "username"],
    components: {
        ChatText
    },
    updated() {
        var objDiv = document.querySelector(".chat-content");
        objDiv.scrollTop = objDiv.scrollHeight + 200;


    },
    methods: {
        sendText(e) {
            e.preventDefault();
            // console.log(this.roomId);
            let message = document.getElementById("messageText").value;
            const username = this.username;

            this.$socket.emit("sendText", {
                username,
                message,
                roomId: this.roomId,
            });

            document.getElementById("messageText").value = '';
        },
        toggleChat() {
            const chat = document.querySelector("#chat-wrap").classList;
            const hide = chat.contains("hide");

            if(hide) {
                return chat.remove("hide");
            }
            chat.add('hide');
        }
    },
}
</script>

<style scoped>

    .chat-box {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 350px;
        height: auto;
        background-color: var(--background-color-light);
        border-top: 0;
        border-right: 0;
        border-top-left-radius: 5px; 
        overflow: hidden;
    }

    .hide {
        display:none !important;
    }

    .chat-topbar {
        position: relative;
        width: 100%;
        height: 40px;
        padding: 5px;
        background: var(--background-color-light);       
        border-top-right-radius: 5px; 
        border-top-left-radius: 5px; 
        border-top: 6px solid var(--border-shadow); 
        border-left: 6px solid var(--border-shadow); 
        border-bottom:  4px solid var(--background-color-light);
        border-right: 0;
    }

    .chat-topbar:hover {
        background: var(--mid-dark);
        border-bottom:  4px solid var(--mid-dark);
    }

    .chat-content {
        position: relative;
        width: auto;
        height: 300px;
        border-left: 6px solid var(--border-shadow);
        border-top: 0;
        border-bottom: 0;
        overflow-y: scroll;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        /* background: green; */
        /* border: 4px solid red; */
    }

     .chat-content::-webkit-scrollbar {
        display: none;
    }

    .chat-input {
        position: relative;
        width: 100%;
        height: 40px;
        display: flex;
        /* background: green; */
        border-top: 6px solid var(--border-shadow);
        font-size: var(--input-font-size-large);
    }

    .chat-input input[type=text] {
        margin: 0;
        padding: 0;
        color: var(--text-color-light);
        background-color: var(--background-color-dark);;
    }

    .chat-input input[type=button] {
        display:none;
        margin: 0;
        padding: 0;
    }

    input:focus, textarea:focus {
        outline: none;
    }

</style>