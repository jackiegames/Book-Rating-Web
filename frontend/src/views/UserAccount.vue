
<script setup>
import Navigation from '../components/Navigation.vue';
import axios from 'axios';

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref(null);
const ratings = ref([]);

onMounted(async () => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
        user.value = JSON.parse(savedUser);
        console.log("Loaded user:", user.value);

        await getRatings();
    }
});

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('review');

    user.value = null;
    ratings.value = [];

    router.push("/");
};

async function getRatings() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/LoginPage');
            return;
        }

        const response = await axios.get(
            'http://localhost:4000/api/v1/rating/getRatings',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        ratings.value = response.data;

        console.log("User ratings:", ratings.value);

    } catch (error) {
        console.error(
            "Could not retrieve ratings:",
            error.response?.data || error
        );
    }
}
</script>


<template>
    <header>

        <Navigation />
        <h1>Account Information</h1>
        <hr>

    </header>
    <main>
        <body>
        <!--Account information-->
        <div class="user-info" v-if="user">

            <p class="text">
                Username: {{ user.username }}
            </p>
            
            <p class="text">
                Email: {{ user.email }}
            </p>
            <!-- <p class="text">
                Id: {{ user.id }}
            </p> -->
        </div>

        <!--Book Ratings-->
        <h3>Book Ratings</h3>

        <div class="ratings-container" v-if="user">

            <template v-if="ratings.length > 0">

                <div 
                    v-for="rating in ratings"
                    :key="rating._id"
                    class="rating-card"
                >
                    <img v-if="rating.bookCover" 
                        :src="rating.bookCover" 
                        :alt="rating.bookTitle" 
                        class="rating-image" 
                    />
                    
                    <p class="rating-title">
                        Book Title: {{ rating.bookTitle }}
                    </p>

                    <p class="text">
                        Rating: {{ rating.rating }}
                    </p>

                    <p class="text">
                        Review: {{ rating.review }}
                    </p>

                    <p v-if="rating.read" class="text">
                        New Read
                    </p>

                    <p v-else class="text">
                        Re-read
                    </p>

                </div>
            </template>

            <p v-else class="text">You haven't rated any books yet.</p>

        </div>

        <div class="user-info" v-if="!user">
            <p class="text">Save all previous reads here</p>
            <p class="text">
                Forgot to log in?
                <RouterLink class="link" to="/LoginPage">Log in</RouterLink>
            </p>
        </div>
        <button v-if="user" class="logout-btn" @click="logout">Log Out</button>

    </body>
    </main>

</template>

<style scoped>

    main {
        background-color: #F5F0E6;
        min-height: 100vh;
    } 
    body{
        margin: 10px;
        background-color: #F5F0E6;
    } 
    h1{
        margin: 10px;
    }

    h1, h3, .title{
        color: var(--header-color);
    }
    h3{
        text-decoration: underline;
    }

    .text{
        color:var(--text-color);
        font-size:20px;
        font-weight: 500;
    }
    .link{
        font-weight: 600;
        color: var(--button-color);
    }
    .link:hover{
        color: var(--button-color-ease);
    }
    .logout-btn{
        background-color: var(--button-color);
        color: var(--card-color);

        border: 0;
        border-radius: 10px;

        margin: 10px;
        padding: 10px;

        margin-top: 30px;
        width:150px;
    }
    .logout-btn:hover{
        background-color: var(--button-color-ease);
        transition: 0.25s ease;
        text-decoration: underline;
    }

    .rating-title{
        color: var(--headerColor);
        font-size:20px;
        font-weight: 500;
    }

    .ratings-container{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 35px;
    }

    .rating-card{
        background-color: var(--card-color);
        border-radius:15px;
        padding: 20px;
        box-shadow: 0px 1px 5px rgb(121, 121, 130);
        transition: transform 0.2s ease;

        overflow: hidden;
    }

    .rating-image{
        border-radius: 10px;
        border: 2px solid black;
        width: 150px;
        height: 200px;
        margin-bottom: 10px;
    }


    @media (max-width: 600px){
    h1{
        font-size:28px;
    }
}
</style>