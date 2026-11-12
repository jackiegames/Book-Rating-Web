import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import Dashboard from '../views/Dashboard.vue'
import Practice from '../views/Practice.vue'
import CreateAccount from '../views/CreateAccount.vue'
import Results from '../views/Results.vue'


const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/Dashboard',
        name: 'Dashboard',
        component: Dashboard
    },

    {
        path: '/Practice',
        name: 'Practice',
        component: Practice
    },

    {
        path: '/CreateAccount',
        name: 'CreateAccount',
        component: CreateAccount
    },

    {
        path: '/Results',
        name: 'Results',
        component: Results
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router