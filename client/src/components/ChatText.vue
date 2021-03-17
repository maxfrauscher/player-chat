<template>
  <div class="chat-textbox bs-bottom-right" :class="{ me: isActive }">
      <b-icon class="corner" icon="caret-left-fill" font-scale="1.2" />
        <div class="chat-border" >
            <div class="chat-user">{{text.username}}</div>
            <div class="chat-text">{{text.message}}</div>
            <div class="chat-time">{{text.time}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChatText",
    props: ["text"],
    data() {
        return {
            isActive: false,
        }
    },
    created() {
        if(this.text.username === this.$route.query.username)
         this.isActive = true;
    }
}
</script>

<style scoped>

.corner {
    position: absolute;
    top: -2px;
    left: -10px;
    padding: 0;
    margin: 0;
    color: var(--background-color-dark);
}

.chat-textbox {
    position: relative;
    width: fit-content;
    min-width: 200px;
    text-align: left;
    background: var(--background-color-dark);
    color: var(--text-color-light); 
    float: left;
    padding-top: 8px;
    padding-bottom: 0;
    margin: 10px;
    border-top-right-radius: 5px; 
    border-top-left-radius: 5px; 
    border-radius: 5px;
}

.me {
    float: right;
    background: var(--background-color-lighter-dark);
    color: var(--text-color-dark); 
    border-left: 6px solid rgba(1,1,1,0.1);
    border-bottom: 6px solid rgba(1,1,1,0.1);
    border-right: 6px solid rgba(1,1,1,0);;
    border-top: 6px solid rgba(1,1,1,0);;
    border-top-right-radius: 5px; 
    border-top-left-radius: 5px; 
}

.me .chat-user{
    display:none;
}

.me .chat-text{
    padding: 0px;
}

.me .corner {
    color: var(--background-color-lighter-dark);
    left: unset;
    right: -10px;
    transform: rotateY(180deg);
    text-align: right;
    float: right;
    padding: 0px;
}

.chat-border {
    height: auto;
    padding: 8px;
    /* background: cyan; */
}

.chat-user {
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    padding: 2px;
    padding-top: 4px;
    padding-left: 8px;
    width: auto;
    /* background: #444;  */
}

.chat-text {
    padding: 0;
    padding-top: 10px;

    /* background: orange;  */
}

.chat-time {
    font-size: 12px;
    color: var(--text-color-dark); 
    position: absolute;
    /* background: red;  */
    right: 2px;
    bottom: 0;
    padding: 4px;
}

</style>