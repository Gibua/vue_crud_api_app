import { createRouter, createWebHistory } from 'vue-router';
import HomeApp from '../components/HomeApp.vue';
import EditEntry from '../components/EditEntry.vue';

const routes = [
    {
        path: '/',
        alias: '/lista',
        name: 'lista',
        component: HomeApp
    },
    {
        path: '/lista/:id',
        alias: '/edit/:id',
        name: 'edit',
        component: EditEntry
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;