<script setup>
import Navigation from '../components/Navigation.vue'

import { ref, onMounted } from 'vue';

const currentBook = ref(null);
const expanded = ref(false);

function loadBook(){
    const savedBook = localStorage.getItem("searched-book");

    currentBook.value = savedBook ? JSON.parse(savedBook) : null;

    expanded.value = false;
    if(currentBook.value) {
        localStorage.setItem("rate-book",
        JSON.stringify(currentBook.value));
    }
}

function toggleExpanded(){
    expanded.value = !expanded.value;
}
onMounted(() =>{
    loadBook();    
});

</script>

<template>
    <header>
        <Navigation />
    </header>
    <main>
        <h1>Search Results</h1>
        <hr>
        
        <div v-if="currentBook" class="search-result">
            <div class="book-image">
                <img
                    v-if="currentBook.cover_i"
                    class="search-image"
                    :src="`https://covers.openlibrary.org/b/id/${currentBook.cover_i}-M.jpg`"
                    :alt="currentBook.title"
                />
                <RouterLink to="/Rate" class="rate-btn">Rate</RouterLink>

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

    .search-button,.rate-btn{
        border-radius: 10px;
        border: 0px;
        color: var(--card-color);
        background-color: var(--button-color);
        margin: 15px auto 0;
        display: block;
        width:200px;
        text-align:center;
        text-decoration: none;
    }
    .search-button:hover, .rate-btn:hover{
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