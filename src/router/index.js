import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store';

const routes = [
    {
        path: '/welcome',
        component: () => import('@/views/Welcome.vue'),
    },
    {
        path: '/',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
            requiresAuth: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    base: '/qcloud',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (useUserStore().isLoggedIn()) {
            next();
        } else {
            next({ path: '/welcome' });
        }
    } else {
        next();
    }
});

export default router
