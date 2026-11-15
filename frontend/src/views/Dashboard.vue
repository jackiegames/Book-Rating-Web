<script setup>
import Navigation from '../components/Navigation.vue'
import Books from '../components/Books.vue'
</script>

<template>
    <header>

    </header>
    <main>
        <Navigation />
        <hr>
        <h1 style="color: var(--header-color)">All Books</h1>
        <Books />        
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

    @media (max-width: 600px){
    h1{
        font-size:28px;
    }
}
</style>