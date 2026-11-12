<script setup>
import { ref } from 'vue';

    const props = defineProps({
        hasSearched: Boolean
    })

    const emit = defineEmits(['searched'])
    const book = ref(null)
    const loading = ref(false)
    const searchTitle = ref('')

    async function fetchData(){
        if(!searchTitle.value.trim()) return

       
        try{
            loading.value = true

            const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTitle.value)}&fields=key,title,author_name,cover_i,first_publish_year,edition_count,description&limit=1`)
            
            if(!response.ok){
                throw new Error("Could not fetch resource");
            }
        
            const data = await response.json()

            if(data.docs.length == 0)
            {
                book.value = null
                return
            }

            book.value = data.docs[0]

            emit('searched')
            
        } catch(error){
            console.error(error)
            book.value = null
            
        } finally{
            loading.value = false;
        }
    }

</script>

<template>
    
    <div id="container">
        <h1 id="logo">On the Shelf</h1>
        <form @submit.prevent="fetchData">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search" />
            <div class="search">
                <span class="search-icon material-symbols-outlined">search</span>
                <input v-model="searchTitle" class="search-input" type="search" id="input" placeholder="new read!"/>
            
                </div>
            </form>
            <p v-if="loading">Searching</p>
                <div v-if="!loading && book" class="search-result">
                    
                    <div :key="book.key">
                    <img v-if="book.cover_i" class="search-image"
                        :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                                :alt="book.title"/>
                    <h2 >Title: {{book.title}}</h2>


                    <p >Author: {{book.author_name}}</p>


                    <p>Publish year: {{book.first_publish_year || "Unknown"}}</p>

                    <p >Description: {{book.description || "Unknown"}}</p>
                    </div>

                </div>
        <p v-if="props.hasSearched && !loading && !book">No book found</p>
            </div>
</template>

<style scoped>

</style>
