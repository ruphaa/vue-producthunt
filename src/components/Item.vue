<template>
    
    <div class="post" :key="post.id" :id="post.id">
        <!-- 
            id
            image
            content -
                Name
                Tagline
                External link
            Upvotes
            -->
        <div class="post__image"><img v-bind:src="(post.thumbnail && post.thumbnail.image_url) || (post.image_url)" alt=""></div>
        <div class="post__content">
            <h3 class="name"><a :href="post.discussion_url" target="_blank">{{ post.name }}</a></h3>
            <p class="tagline">{{ post.tagline }}</p>
            <div class="link">
                <a :href="post.redirect_url" target="_blank">
                    <i class="fa fa-external-link"></i>
                </a>
            </div>
            <div class="bookmark" v-if="isAuthenticated && !($route.name == 'collections')">
                <a href="javascript:void(0)" v-if="found" @click.prevent="removeFromBookmark()">
                    <i class="fa fa-bookmark"></i>
                </a>
                <a href="#" @click.prevent="addToBookmark()" v-else>
                    <i class="fa fa-bookmark-o"></i>
                </a>
            </div>
        </div>
        <div class="post__upvotes">
            <i class="fa fa-caret-up"></i>
            <div class="vote">{{ post.votes_count }}</div>
        </div>
    </div>
</template>

<script>
import { bookmarksCollection } from '../firebase.js'
export default {
    name: 'item',
    props: ['post'],
    data() {
        return {
            isFound: false
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.authenticated;
        },
        getUser() {
            return this.$store.getters.user;
        },
        found() {
            return this.isFound;
        }
    },
    mounted() {
        this.postAlreadyExists();
    },
    updated() {
        this.postAlreadyExists();
    },
    methods: {
        addToBookmark() {
            let user = this.getUser;
            const $this = this;
            bookmarksCollection.add({
                id: this.post.id,
                image_url: this.post.thumbnail.image_url,
                discussion_url: this.post.discussion_url,
                name: this.post.name,
                redirect_url: this.post.redirect_url,
                tagline: this.post.tagline,
                user_id: user.user.uid,
                votes_count: this.post.votes_count
            })
            .then(function(docRef) {
                $this.$store.dispatch('fetchUserCollection', {user})
                    .then(data => {
                        $this.isFound = true;
                        alert('Added to collection successfully')
                    })
                    .catch(err => {
                        console.log('Error', err)
                    })
            })
            .catch(function(error) {
                console.log('Error---->', error)
            });
        },
        removeFromBookmark() {
            let user = this.getUser;
            const $this = this;
            bookmarksCollection.get().then((querySnapshot) => {
                let posts = [];
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    if((data.user_id == user.user.uid) && (data.id == this.post.id)) {
                        doc.ref.delete();
                    }
                });
                $this.$store.dispatch('fetchUserCollection', {user})
                    .then(data => {
                        $this.isFound = false;
                        alert('Deleted from the collection successfully')
                    })
                    .catch(err => {
                        console.log('Error', err)
                    })
            })
            .catch(err => {
                console.log("Error getting document", err)
            });
        },
        postAlreadyExists() {
            this.isFound = this.$store.getters.postsCollection.some(post => post.id == this.post.id)
        }
    }
};
</script>
<style scoped>
    
    .post {
        background-color: #ffffff;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        padding: 20px 20px 20px 20px;
    }

    .post__image {
        margin-right: 10px;
    }
    .post__image img {
        width: 80px;
        height: 80px;
    }
    .post__content {
        flex: 1;
    }
    .post__content h3 {
        color: #666;
    }
    h3 a {
        text-decoration: none;
        color: #666;
    }
    .post__content p {
        color: #999;
    }
    .post__content .link, .post__content .bookmark {
        display: inline-block;
        padding: 1px;
    }
    .link a, .bookmark a {
        text-decoration: none;
        color: #999;
    }
    .post__content .bookmark {
        margin-left: 10px;
    }
    .post__upvotes {
        padding: 5px;
        border: 1px solid #e8e8e8;
        width: 60px;
        height: 70px;
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .post__upvotes i {
        font-size: 20px;
        line-height: 20px;
    }
    .post__upvotes .vote {
        font-weight: 700;
    }
</style>