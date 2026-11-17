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
        <h4 style="color: var(--header-color)">Most Popular Books</h4>
        <Books />        
    </main>

</template>

<style scoped>

    main {
        background-color: var(--background-color);
        min-height: 100vh;
    }

    h4{
        background-color: var(--background-color);
        margin:10px;
        font-size:24px;
    }

    @media (max-width: 600px){
    h4{
        font-size:20px;
    }
}
</style>