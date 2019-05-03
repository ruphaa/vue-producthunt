<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email*" required color="red accent-2" v-model="email"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required color="red accent-2" v-model="password"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        <p>You don't have an account ? Create an account</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red accent-2" flat @click="dialog = false">Close</v-btn>
          <v-btn color="red accent-2" flat @click="login()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import firebase from 'firebase';

export default {
    mixins: [validationMixin],
    validations: {
      email: { required, email },
      password: { required }
    },
    name: 'login',
    data: () => ({
      dialog: false,
      email: "",
      password: ""
    }),
    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors() {
        const errors = []
        !this.$v.password.required && errors.push('Password is required')
        return errors
      }
    },
    mounted() {
      this.$eventHub.$on('open-modal', this.openModal)
    },
    beforeDestroy() {
      this.$eventHub.$off('open-modal')
    },
    methods: {
      openModal: function(dialog) {
        console.log(dialog)
        this.dialog = dialog;
      },
      login: function() {
        console.log("make a call to firebase", this.email, this.password)
        let email = this.email;
        let password = this.password;
        this.$store.dispatch('login', {email, password})
        this.dialog = !this.dialog;
        this.$v.$reset()
        this.email = ''
        this.password = ''
      }
    }
    
}
</script>
<style scoped>

</style>