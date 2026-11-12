<script setup>
import Navigation from '../components/Navigation.vue'
import Books from '../components/Books.vue'
</script>

<template>
    <header>

    </header>
    <main>
        <Navigation />
        <h1>Dashboard</h1>
        <Books />
        <nav>
            <ul>
                <li>
                 <RouterLink to="/" class="">Log Out</RouterLink>
                </li>
            </ul>
        </nav>
        
    </main>

</template>

<style scoped>
    h1{
        margin:10px;
    }
</style>