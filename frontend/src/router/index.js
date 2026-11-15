import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import Dashboard from '../views/Dashboard.vue'
import CreateAccount from '../views/CreateAccount.vue'
import UserAccount from '../views/UserAccount.vue'



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
        path: '/CreateAccount',
        name: 'CreateAccount',
        component: CreateAccount
    },

    {
        path: '/UserAccount',
        name: 'UserAccount',
        component: UserAccount
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router