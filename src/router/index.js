import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () =>
                import('../views/HomeView.vue')
        },
        {
            path: '/user/add',
            name: 'addUser',
            component: () =>
                import('../views/AddUser.vue')
        },
        {
            path: '/user/edit/:id',
            name: 'editUser',
            component: () =>
                import('../views/AddUser.vue')
        },
        {
            path: '*',
            name: 'not-found',
            component: () => import('../views/NotFound.vue')
        }
    ]
})

export default router
