import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChangeNote from '../views/ChangeNote.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/change-note/:index',
        name: 'ChangeNote',
        component: ChangeNote,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
