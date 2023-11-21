import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
    }),
    getters: {
        token: (state) => () => localStorage.getItem('token') || '',
        isLoggedIn: (state) => () => !!localStorage.getItem('token'),
    },
    actions: {
        login(token) {
            localStorage.setItem('token', token);
        },
        logout() {
            localStorage.removeItem('token');
        },
    },
});
