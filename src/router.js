import Vue from 'vue';
import Router from 'vue-router';
import CreateListView from '@/views/CreateListView';
import Collections from '@/views/Collections';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/popular'
        },
        {
            path: '/popular',
            name: 'popular',
            component: CreateListView,
            props: { type: 'popular' }
        },
        {
            path: '/recent',
            name: 'recent',
            component: CreateListView,
            props: { type: 'recent' }
        },
        {
            path: '/previous',
            name: 'previous',
            component: CreateListView,
            props: { type: 'previous' }
        },
        {
            path: '/collections',
            name: 'collections',
            component: Collections
        }
    ]
});

export default router;
