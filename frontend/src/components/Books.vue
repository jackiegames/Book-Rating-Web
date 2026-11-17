<script setup>
import {ref, onMounted} from 'vue';

const books = ref([])
const loading = ref(true)

  async function fetchBooks(){
    try {
        loading.value = true;

        const response = await fetch(
            'https://openlibrary.org/trending/weekly.json?limit=20'
        );

        if(!response.ok){
            throw new Error("Could not fetch resources");
        }

        const data = await response.json();

        books.value = await Promise.all(
            (data.works || []).map(async (book) => {

                let description = "Description unavailable.";

                try { // To fetch individual book descriptions
                    const bookResponse = await fetch(
                        `https://openlibrary.org${book.key}.json`
                    );

                    if(bookResponse.ok) {
                        const bookData = await bookResponse.json();

                        if(typeof bookData.description === "string"){
                            description = bookData.description;
                        }
                        else{
                            description = bookData.description.value;
                        }
                    }

                } catch(error) {
                    console.error("Could not fetch description:", error);
                }

                return {
                    ...book,
                    description,
                    expanded: false
                };
            })
        );

    } catch(error){
        console.error(error);
    } finally {
        loading.value = false;
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

            <p class="card-text" :class="{ expanded: book.expanded }">Description: {{book.description || "Unknown"}}</p>

            <button class="card-button" @click="book.expanded = !book.expanded">{{ book.expanded ? "Read Less" : "Read More" }}</button>
        </div>
    
    </div>
    </div>

</template>

    <style scoped>

    .card-title{
        color: var(--headerColor);
    }

    .card-button{
        border-radius: 10px;
        border: 0px;
        color: var(--card-color);
        background-color: var(--button-color);
        margin: 15px auto 0;
        display: block;
        width:200px;
    }
    .card-button:hover{
        transition: 0.25s ease;
        background-color: var(--button-color-ease);
    }

    .books-container{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 35px;
        margin: auto;
    }

    .card{
        background-color: var(--card-color);
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
        width:200px;
        height:220px;
        border: 2px solid black;
        border-radius:5px;
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
        color: var(--text-color);
    }
    .card-text.expanded{
        display: block;
        -webkit-line-clamp: unset;
        overflow: visible;

    }

    @media (max-width: 600px){
        .library{
            padding: 20px;
        }
    }
</style>
