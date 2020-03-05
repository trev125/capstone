<template>
 <div id="app">
   <v-app>
     <main>
       <v-container fluid fill-height class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                      <v-form v-model="valid" ref="form">
                        <v-text-field
                          label="Enter your e-mail address"
                          v-model="email"
                          :rules="emailRules"
                          id="emailInput"
                          required
                        ></v-text-field>
                        <v-text-field
                          label="Enter your password"
                          v-model="password"
                          min="8"
                          :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :append-icon-cb="() => (e1 = !e1)"
                          :type="e1 ? 'text' : 'password'"
                          @click:append="e1 = !e1"
                          :rules="passwordRules"
                          id="passwordInput"
                          counter
                          required
                        ></v-text-field>
                        <v-layout justify-space-between>
                            <v-btn type="submit" @click.stop.prevent="submit()" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Login</v-btn>
                        </v-layout>
                      </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>
     </main>
   </v-app>
 </div>
 </template>

 <script src="https://unpkg.com/vue/dist/vue.js"></script>
 <script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
 <script>
export default{
        data () {
          return {
            valid: false,
            e1: false,
            password: '',
            passwordRules: [
              (v) => !!v || 'Password is required',
            ],
            email: '',
            emailRules: [
              (v) => !!v || 'E-mail is required',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
          }
        },
        methods: {
          submit () {
            if (this.$refs.form.validate()) {
              console.log('Email to be saved: ',this.$refs.form.$el[0]._value)
              console.log('Password to be saved: ',this.$refs.form.$el[1]._value)
              this.$router.push("/dashboard");
              //this.$refs.form.$el.submit()
            }
            // else {
            //   alert('hey thats not valid')
            // }
          },
          clear () {
            this.$refs.form.reset()
          }
        },
    }

 </script>