<template>
    <v-container fluid>
        <rise-loader :loading="loading" :color="color" class="loader"></rise-loader>
        <v-layout class="parent">
            <item v-for="post in posts" :key="post.id" :post="post"></item>  
        </v-layout>
        <login></login>
        <signup></signup>
    </v-container>
</template>
<script>
import axios from 'axios';
import Item from '@/components/Item.vue';
import RiseLoader from 'vue-spinner/src/RiseLoader.vue';
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';

export default {
    name: 'create-list-view',
    props: {
        type: String
    },
    components: {
        Item,
        RiseLoader,
        Login,
        Signup
    },
    data() {
        return {
            posts: [],
            authString: process.env.VUE_APP_AUTHSTRING,
            urls: {
                popular: "https://api.producthunt.com/v1/posts/all?sort_by=votes_count&order=desc&search[featured_month]=3&search[featured_year]=2019&per_page=12&page=1",
                previous: "https://api.producthunt.com/v1/posts?days_ago=1&per_page=12&page=1",
                recent: "https://api.producthunt.com/v1/posts?per_page=12&page=1",
                collections: ""
            },
            loading: true,
            color: "#FF5252"
        }
    },
    methods: {
        changeUrl: function() {
            this.current_url = this.urls[this.type]
        },
        getProductPosts: function() {
            axios.get(this.current_url, { headers: { Authorization: this.authString } })
            .then(response => {
                if(response.data) {
                    this.posts = response.data.posts;
                    this.loading = false;
                }
            })
            .catch((error) => {
                if(error) {
                    this.loading = false;
                    console.log('error ' + error);
                }
            });
        }
    },
    beforeMount() {
        this.changeUrl()
    },
    mounted() {
        this.getProductPosts()
    },
    watch: {
        type: function() {
            this.changeUrl()
            this.posts = [];
            this.loading = true;
            this.getProductPosts()
        }
    }
};
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