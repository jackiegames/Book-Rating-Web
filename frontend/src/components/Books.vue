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
            books.value = (data.docs || []).map(book =>({
                ...book,
                expanded: false
            }))

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
    <div class="library">
    <h3 v-if="loading" style="color: var(--color)">Loading Books...</h3>
    <div v-else class="books-container">
        <div v-for="book in books" :key="book.key" class="card">

            <div class="image-container">
            <img v-if="book.cover_i" class="card-image" 
                :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                        :alt="book.title"/> 
                    </div>

            <h3 class="card-title">Title: {{book.title}}</h3>


            <p class="card-text">Author: {{book.author_name}}</p>


            <p class="card-text">Publish year: {{book.first_publish_year || "Unknown"}}</p>

            <p :class="{'text': true, 'card-text': !book.expanded }">Description: {{book.description || "Unknown"}}</p>

            <button class="card-button" @click="book.expanded = !book.expanded">{{ book.expanded ? "Read Less" : "Read More" }}</button>
        </div>
    
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
.card-title{
    color: var(--headerColor);
}

.card-text{
    width:250px;
}

.card-button{
    border-radius: 10px;
    border: 2px solid var(--headerColor);
    color: var(--color);
    background-color: var(--background-color);
    margin: 15px auto 0;
    display: block;
    width:200px;
}

.books-container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 35px;
    /* max-width: 1200px; */
    margin: auto;
}

.card{
    background-color: white;
    border-radius:15px;
    padding: 20px;
    box-shadow: 0px 1px 5px rgb(121, 121, 130);
    transition: transform 0.2s ease;

    overflow: hidden;
}

.card:hover{
    transform: translateY(-6px); /* moves the card when people hover over it */
}

.image-container{
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.card-image{
    width: 180px;
    height: 210px;
    object-fit: cover;
    border-radius: 10px;
}

.library{
    margin: 40px;
    background-color: var(--background-color);
}
.card-text{
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@media (max-width: 600px){
    .library{
        padding: 20px;
    }
}
</style>
