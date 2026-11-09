<script setup>
import {ref, onMounted} from 'vue';

const books = ref([])
const loading = ref(true)

    async function fetchBooks(){
        try{
            const response = await fetch(`https://openlibrary.org/search.json?q=subject%3Afiction&fields=key,title,author_name,cover_i,first_publish_year,edition_count,description&limit=12&sort=editions`);
                
            if(!response.ok){
                throw new Error("Could not fetch resources");
            }

            const data = await response.json();
            books.value = data.docs || []

            } catch(error){
                console.error(error);
            } finally {
                loading.value = false
            }
        }
    
    onMounted(() =>{
        fetchBooks()
    })

</script>

<template>
    <p v-if="loading">Loading Books</p>
    <div v-else class="books-container">
        <div v-for="book in books" :key="book.key" class="card">
            <img v-if="book.cover_i" class="card-image" 
                :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                        :alt="book.title"/>
            <h3 class="card-title">Title: {{book.title}}</h3>


            <p class="card-text">Author: {{book.author_name}}</p>


            <p class="card-text">Publish year: {{book.first_publish_year || "Unknown"}}</p>

            <p class="card-text">Description: {{book.description || "Unknown"}}</p>
        </div>
    
    </div>

</template>

<style scoped>
.card-image{
    width:200px;
    height:220px;
    border: 2px solid black;
    border-radius:5px;
}

.card-text{
    width:500px;
}
</style>
