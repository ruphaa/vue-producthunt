<template>
    <v-container fluid>
        <rise-loader :loading="loading" :color="color" class="loader"></rise-loader>
        <v-layout class="parent">
            <item v-for="post in posts" :key="post.id" :post="post"></item>  
        </v-layout>
    </v-container>
</template>

<script>
import { bookmarksCollection } from '../firebase.js';
import Item from '@/components/Item.vue';
import RiseLoader from 'vue-spinner/src/RiseLoader.vue';

export default {
    name: 'collections',
    components: {
        Item,
        RiseLoader
    },
    computed: {
        getUser: function() {
            return this.$store.getters.user;
        }
    },
    methods: {
        getBookmarks: function() {
            this.$bind('collections', bookmarksCollection.get().then(documents => {
                console.log(documents);
            }));
        }
    },
    mounted() {
        this.getBookmarks();
    },
    data() {
        return {
            posts: [],
            color: "#FF5252",
            loading: true
        }
    }
}
</script>

<style scoped>
    .parent {
        display: flex;
        flex-direction: column;
        max-width: 750px;
        margin: 0 auto;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    }
    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
    }
</style>