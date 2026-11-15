<script setup>
import Navigation from '../components/Navigation.vue'
import Books from '../components/Books.vue'
</script>

<template>
    <header>

    </header>
    <main>
        <Navigation />
        <h1 style="color: var(--headerColor)">Account Information</h1>
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
        background-color: var(--background-color);
        margin:10px;
    }

    @media (max-width: 600px){
    h1{
        font-size:28px;
    }
}
</style>