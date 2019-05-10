<template>
    <span>
        <v-navigation-drawer v-model="drawer" app class="red accent-2" absolute temporary dark disable-resize-watcher>
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index">
                        <v-list-tile-content >{{ item.title }}</v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="red accent-2" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title to="/" class="title">{{ appTitle }}</v-toolbar-title>
            </router-link>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn to="/popular" flat class="hidden-sm-and-down">Popular</v-btn>
            <v-btn to="/recent" flat class="hidden-sm-and-down">Recent</v-btn>
            <v-btn to="/previous" flat class="hidden-sm-and-down">Previous</v-btn>
            <v-btn flat class="hidden-sm-and-down" v-if="!isAuthenticated" @click.stop="login">Login</v-btn>
            <v-btn v-if="!isAuthenticated" flat class="hidden-sm-and-down" @click.stop="signup">Signup</v-btn>
            <v-btn to="/collections" v-if="isAuthenticated" flat class="hidden-sm-and-down">Collections</v-btn>
            <v-btn v-if="isAuthenticated" flat class="hidden-sm-and-down" @click.stop="signout">Sign Out</v-btn>
        </v-toolbar>
    </span>
</template>

<script>
export default {
    name: 'AppNavigation',
    data: function() {
        return {
            appTitle: 'Product Hunt',
            drawer: false,
            items: [
                {title: 'Popular'},
                {title: 'Recent'},
                {title: 'Previous'},
                {title: 'Sign up'}
            ],
            loginDialog: false,
            signupDialog: false
        }
    }, 
    methods: {
        login() {
            // open modal
            this.loginDialog = !(this.loginDialog);
            if(this.loginDialog) this.$eventHub.$emit('open-modal', this.loginDialog)
            this.loginDialog = !(this.loginDialog);
        },
        signout() {
            this.$store.dispatch('signout');
            this.$router.push('/');
        },
        signup() {
            this.signupDialog = !(this.signupDialog);
            if(this.signupDialog) this.$eventHub.$emit('open-signup-modal', this.signupDialog)
            this.signupDialog = !(this.signupDialog);
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.authenticated;
        }
    }
}
</script>

<style scoped>
    a {
        text-decoration: none;
        color: white;
    }
    a.title {
        font-size: 16px;
        font-weight: 700;
    }
</style>
