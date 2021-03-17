<template>
 <div class="userlist">
    <div class="header" v-on:click="toggleUsers">Users Online</div>
    <div class="user-content hide">
        <div class="user" v-for="user in userList" 
            :key="user.id">
            {{user.name}}
        </div>
    </div>
 </div>
</template>

<script>
export default {
    name: "UserList",
    props: ["userList"],
    methods: {
        toggleUsers() {
            const user = document.querySelector(".user-content").classList;
            const hide = user.contains("hide");

            if(hide) {
                return user.remove("hide");
            }
            user.add('hide');
        }
    }
}
</script>

<style scoped>
    .header {
        position: relative;
        height: 40px;
        padding: 5px;
        bottom: 0px;
        width: 100%;
        background: var(--background-color-light);
        color: var(--text-color-dark);
        text-align: center;
        border-top-right-radius: 5px; 
        border-top: 6px solid var(--border-shadow); 
        border-bottom:  4px solid var(--background-color-light);
        border-right: 6px solid var(--border-shadow); 
    }

    .header:hover {
        background: var(--mid-dark);
        border-bottom:  4px solid var(--mid-dark);
    }

    .userlist {
        position: absolute;
        text-align: left;
        width: 200px;
        bottom: 0;
        margin: 0 !important;
        border-top-right-radius: 5px; 
        border-top-left-radius: 5px; 
        border-right: 0;
    }

    .user-content {
        position: relative;
        padding: 0;
        margin: 0;
        text-align: left;
        width: 200px;
        height: 100%;
        bottom:0;
        background: var(--background-color-dark);
        overflow-y: scroll;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none; 
        border-right: 4px solid rgba(1,1,1,0.1);
        color: var(--background-color-light);
    }

    .user-content::-webkit-scrollbar {
        display: none;
    }

    .user {
        width: auto;
        float:left;
        padding: 5px;
        text-align: left;
        background: var(--blackish);
        border-top-right-radius: 8px;
        margin: 5px;
        color: var(--text-color-dark);
    }

    .hide {
        display:none !important;
    }
</style>