<script setup>
import Navigation from '../components/Navigation.vue'

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);

onMounted(() =>{
    const savedUser = localStorage.getItem("user");

    if(savedUser) {
        user.value = JSON.parse(savedUser);
    }
    
});

const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
}

</script>

<template>
    <header>

    </header>
    <main>
        <Navigation />
        <h1 style="color: var(--headerColor)">Account Information</h1>
        <hr>
        <div class="user-info" v-if="user">
            <p>Username: {{ user.username }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Id: {{ user.id }}</p>
            <button class="button" @click="logout">Log Out</button>
        </div>

        
        <div class="user-info" v-else-if="!user">

            <p class="text">
                Forgot to log in?
                <RouterLink class="link" to="/">Log in</RouterLink>
            </p>
        </div>
        
    </main>

</template>

<style scoped>

    main {
        background-color: #F5F0E6;
        min-height: 100vh;
    }  

    h1{
        background-color: var(--background-color);
        margin:10px;
    }

    .user-info{
        margin:10px;
    }


    .text{
        color:var(--text-color);
    }
    .link{
        font-weight: 600;
        color: var(--button-color);
    }
    .link:hover{
        color: var(--button-color-ease);
    }
    .button{
        background-color: transparent;
        border:0px;
        margin:0px;
        padding:0px;
        color: var(--button-color);
    }
    .button:hover{
        background-color: transparent;
        border:0px;
        color: var(--button-color-ease);
        text-decoration: underline;
    }


    @media (max-width: 600px){
    h1{
        font-size:28px;
    }
}
</style>