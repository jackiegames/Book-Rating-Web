import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import Dashboard from '../views/Dashboard.vue'
import CreateAccount from '../views/CreateAccount.vue'
import UserAccount from '../views/UserAccount.vue'
import Rate from '../components/Rate.vue'
import SearchResults from '@/views/SearchResults.vue'




const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },

    {
        path: '/LoginPage',
        name: 'LoginPage',
        component: LoginPage
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
    },

    {
        path: '/SearchResults',
        name: 'SearchResults',
        component: SearchResults
    },

    {
        path: '/Rate',
        name: 'Rate',
        component: Rate
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router