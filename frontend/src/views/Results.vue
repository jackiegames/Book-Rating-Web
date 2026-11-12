<script setup>
import Navigation from '../components/Navigation.vue'

</script>

<template>
    <header>

    </header>
    <main>
        <Navigation />
        <h1>RESULTS</h1>
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