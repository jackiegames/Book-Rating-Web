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
    <div class="navigation-bar">
    
        <nav class="nav-bar">
            <ul>
                <!-- <img src="/src/assets/book-logo.avif" class="book-logo"> -->
                <h3 id="logo">On the Shelf</h3>
                <li>
                 <RouterLink to="/Dashboard" class="">Dashboard</RouterLink>
                </li>

                <li>
                    <RouterLink to="/Practice" class="">Practice</RouterLink>
                </li>
                
                <li>
                    <RouterLink to="/Results" class="">Results</RouterLink>
                </li>

                <li>
                    <RouterLink to="/MissedTests" class="">Missed Tests</RouterLink>
                </li>
                <form @submit.prevent="fetchData">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search" />
                <div class="search">
                <span class="search-icon material-symbols-outlined">search</span>
                <input v-model="searchTitle" class="search-input" type="search" id="input" placeholder="new read!"/>
            
                </div>
            </form>
            </ul>
        </nav>
        <div id="container">
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
        </div>
</template>

<style scoped>
nav ul{
    /* background-color: rgb(159, 159, 176); */
    list-style-type: none;
    padding:0px;
    margin:0px;
    overflow:hidden;
    display:flex;

}
nav a{
    color:rgb(0, 0, 0);
    text-decoration:none;
    padding:15px;
    display: block;

}

nav a:hover{
    color:rgb(158, 158, 153);
    
}
li{
    float:left;
    font-weight: bold;
}

#logo{
    margin-right:auto;
}

.search{
    float: right; /*have the search bar on the right always */
    --padding: 12px; /*making padding a variable */
    
   
    display: flex;
    align-items: center;
    padding: var(--padding);
    border-radius: 10px;
    background-color: aliceblue;
    transition: background 0.25s; /*how long it takes for the background to change */
    transition: box-shadow 0.25s;
}
.search-input {
    font-size: 16px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color:rgb(0, 0, 0); /*for the line when typing in the search bar */
    margin-left: var(--padding);
    outline: none;
    border: none;
    background:transparent;
    /* width: 200px; */
}

.search-image{
    width: 200px;
    height: 280px;
    
    border-radius: 10px;
    display: block;
    margin: 20px auto;
}
.search-result{
    align-items:center;
}
.book-logo{
    width:50px;
    height:50px;
}
</style>