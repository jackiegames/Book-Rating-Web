<script setup>
import Navigation from '../components/Navigation.vue'
import Books from '../components/Books.vue'
</script>

<template>
    <header>

    </header>
    <main>
        <Navigation />
        <h1 style="color: var(--headerColor)">All Books</h1>
        <Books />        
    </main>

</template>

<style scoped>
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