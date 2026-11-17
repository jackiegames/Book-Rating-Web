<script setup>
    import Navigation from '../components/Navigation.vue'
    import axios from "axios";
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const currentBook = ref(null);
    const expanded = ref(false);

    const rating = ref('');
    const review = ref('');
    const error = ref('');
    const message = ref('');
    const read = ref(null);

    function loadBook(){
        const rateBook = localStorage.getItem("rate-book");
        currentBook.value = rateBook ? JSON.parse(rateBook) : null;
    }

    function toggleExpanded(){
        expanded.value = !expanded.value;
    }

    onMounted(() =>{
        loadBook();    
    });

    async function submitRating(){
        message.value = "";
        error.value = "";

        try{
            const rateBook = JSON.parse(
                localStorage.getItem("rate-book")
            );
                if(!rateBook){
                    error.value = 'No book selected';
                    return;
                }

                const token = localStorage.getItem('token');

                if(!token){
                    error.value = 'Please log in before submitting a rating';
                    return;
                }
                const newRating ={
                    bookTitle: rateBook.title,
                    rating: Number(rating.value),
                    review: review.value,
                    bookCover: rateBook.cover_i ? 
                        `https://covers.openlibrary.org/b/id/${rateBook.cover_i}-M.jpg`
                        : null,
                    read: read.value
                }

                console.log('Sending rating:', newRating);
                const response = await axios.post('http://localhost:4000/api/v1/rating/createRating',
                    newRating,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

            console.log('Rating response:', response.data);

            message.value = response.data.message;

            rating.value = '';
            review.value = '';
            read.value = null;
            router.push('/UserAccount');
                
        } catch (err){
            console.error("Rating error:", err.response?.data || err);
            error.value = err.response?.data?.message || "Something went wrong with your rating";
        }
    }

</script>

<template>
    <header>
        <Navigation />
    </header>
    <main>
        <h1>Rate Book</h1>
        <hr>
        
        <div v-if="currentBook" class="search-result">
            <div class="book-image">
                <img
                    v-if="currentBook.cover_i"
                    class="search-image"
                    :src="`https://covers.openlibrary.org/b/id/${currentBook.cover_i}-M.jpg`"
                    :alt="currentBook.title"
                />
            </div>
            <div class="book-info">
                <h2 class="search-title">
                    Title: {{ currentBook.title }}
                </h2>

                <p class="search-text">
                    Author: {{ currentBook.author_name }}
                </p>
                <p class="search-text">
                    Publish year: {{ currentBook.first_publish_year || "Unknown" }}
                </p>
                <p class="search-text" :class="{ expanded: expanded }">
                    Description: {{ currentBook.description || "Unknown" }}
                </p>

                <button class="search-button" @click="toggleExpanded">
                    {{ expanded ? "Read Less" : "Read More" }}
                </button>
            </div>
            
            <!--Rating Box-->
            <form @submit.prevent="submitRating">
                        <div class="mb-3">

                            <label for="rating" class="form-label">Rating</label>
                            <input v-model="rating" required type="number" min="0" max="5" id="rating" name="rating" class="form-control" placeholder="Rating">

                        </div>
                        
                        <div class="mb-3">

                            <label class="form-label">Review:</label>
                            <textarea v-model="review" required maxLength="600" id="review" name="review" class="form-control" placeholder="Enter your review">
                            </textarea>

                        </div>

                        <div class="mb-3 d-flex align-items-center gap-4">

                            <label for="rating" class="form-label">New Read:</label>
                            <input 
                                v-model="read" 
                                required 
                                type="radio" 
                                id="new-read" 
                                name="choice"
                                :value="true"
                                >

                            <label for="rating" class="form-label">Re-read:</label>
                            <input 
                                v-model="read" 
                                required 
                                type="radio" 
                                id="re-read" 
                                name="choice"
                                :value="false"
                            >
                        </div>

                        <div class="account-actions">
                            <button type ="submit" class="account-btn"> Submit</button>
                            
                            <br>
                            <p v-if="message" class=success> {{ message }} </p>
                            <p v-if="error" class=error> {{ error }} </p>
                            
                        </div>
                    </form>
        </div>
        
        <p v-else class="search-text">
            No book selected. Please search again
        </p>
    </main>

</template>

<style scoped>

    main {
        background-color: #F5F0E6;
        min-height: 100vh;
    }  

    h1{
        background-color: var(--background-color);
        color: var(--header-color);
        margin:10px;
    }

    .search-text{
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: var(--text-color);
    }
    .search-text.expanded{
        display: block;
        -webkit-line-clamp: unset;
        overflow: visible;
    }
    
    .search-title{
        color: var(--headerColor);
    }

    .search-button{
        border-radius: 10px;
        border: 0px;
        color: var(--card-color);
        background-color: var(--button-color);
        margin: 15px auto 0;
        display: block;
        width:200px;
    }

    .search-button:hover{
        transition: 0.25s ease;
        background-color: var(--button-color-ease);
    }

    .search-result {
        display: flex;
        
        align-items: stretch;
        justify-content: center;
        gap: 25px;
        max-width: 850px;
       
        padding: 20px;
    }

    .search-image {
        width: 250px;
        height: 350px;
        border-radius: 10px;
    }

    .book-info {
        flex: 1;
        min-width: 0;
        background-color: var(--card-color);
        padding: 20px;
        border-radius: 10px;
        
    }

    @media (max-width: 600px){
    h1{
        font-size:28px;
    }
}
</style>