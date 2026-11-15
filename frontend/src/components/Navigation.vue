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
    <nav class="nav-bar">

        <div class="brand">
            <img src="/src/assets/book-logo.svg" class="book-logo" alt="Book logo">
            <RouterLink to="/Dashboard" class="dashboard-link">
                <h3 class="brand-name">On the Shelf</h3>
            </RouterLink>
            
        </div>

        <div class="nav-right">

            <RouterLink to="/UserAccount" class="links">
                User
            </RouterLink>

            <form @submit.prevent="fetchData">
                <div class="search-container">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search" />

                    <span class="search-icon material-symbols-outlined">search</span>

                    <input v-model="searchTitle"
                        class="search-input"
                        type="search"
                        id="input"
                        placeholder="new read!"/>
                </div>
            </form>

        </div>

    </nav>

    <div id="container">
        <p v-if="loading">Searching</p>

        <div v-if="!loading && book" class="search-result">
            <div :key="book.key">
                <img
                    v-if="book.cover_i"
                    class="search-image"
                    :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                    :alt="book.title"
                />

                <h2>Title: {{ book.title }}</h2>
                <p>Author: {{ book.author_name }}</p>
                <p>Publish year: {{ book.first_publish_year || "Unknown" }}</p>
                <p>Description: {{ book.description || "Unknown" }}</p>
            </div>
        </div>

        <p v-if="props.hasSearched && !loading && !book">
            No book found
        </p>
    </div>
</template>

<style scoped>
.nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
}

/* Logo and website name */
.brand {
    display: flex;
    align-items: center;
    gap: 12px;
}

.book-logo {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.brand-name {
    margin: 0;
    font-size: 24px;
    color: var(--header-color);
}
.brand-name:hover {
   color: var(--text-color);
}

/* User link and search bar on the right */
.nav-right {
    display: flex;
    align-items: center;
    gap: 25px;
}

.links {
    color: var(--button-color);
    text-decoration: none;
    font-weight: bold;
}

.links:hover {
    color: #A3B49F;
}

/* Search bar */
.search-container {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    border-radius: 20px;
    background-color: var(--button-color);
}

.search-container:hover{
    transition: 1s ease;
    background-color: var(--button-color-ease);
}

.search-input {
    font-size: 16px;
    font-family: 'Trebuchet MS', sans-serif;
    color: var(--card-color);
    outline: none;
    border: none;
    background: transparent;
    width: 200px;
}

.search-input::placeholder{
    color: var(--card-color);
}

.search-icon {
    color: var(--background-color);
}

.dashboard-link{
    text-decoration: none;
}

</style>