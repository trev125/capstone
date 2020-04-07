<template>
  <div class="team">
    <h1 large class="display-3 text-center pa-8" center>Group</h1>
    <v-row align="center" justify="end">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on" @click="getGroups(loggedInUser)">Add New User</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New User</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="First name*" id="firstName" v-model="newUser.firstName" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Last name*" id="lastName" v-model="newUser.lastName" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Email*" id="email" v-model="newUser.email" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Password*" id="password" v-model="newUser.password" type="password" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="selectableGroups">
                  <v-subheader v-for="group in selectableGroups" :key="group.id" @click.capture.stop="toggleGroup(group)">
                    <v-checkbox v-model="selectedGroups" multiple :value="group" :label="group.name"></v-checkbox>
                  </v-subheader>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false, createNewUser()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <div v-if="finalUsers">
      <v-layout align-center justify-center row fill-height>
      <v-expansion-panels accordion hover multiple style="maxWidth: 800px;">
        <v-expansion-panel v-for="user in finalUsers" :key="user.id">
          <v-expansion-panel-header disable-icon-rotate>
            <template v-slot:actions>
              <v-icon color="#2196F3">account_circle</v-icon>
            </template>
            {{user.firstName}} {{user.lastName}}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="grey--text">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="saveChanges(user.email, user.id), saveUser = true, saveUserName = user.firstName + ' ' + user.lastName"
            >
              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                label="Email"
                required
                :id="`${user.id}-email`"
              ></v-text-field>
              <v-btn
                type="submit"
                :disabled="!valid"
                class="mr-4"
                color="primary"
                small
              >
                Save
              </v-btn>
              <v-btn
                class="mr-4"
                color="amber darken-2"
                small
                dark
                @click="resetPassword(user.id), resetPass = true, resetPassUser = user.firstName + ' ' + user.lastName"
              >
                Reset Password
              </v-btn>
              <v-btn
                class="mr-4"
                color="red"
                small
                dark
                @click.stop="deleteDialog = true"
              >
                Delete User
              </v-btn>
              <v-dialog
                v-model="deleteDialog"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline">Confirm Deletion</v-card-title>
                  <v-card-text>
                    Are you sure you want to delete this user? This cannot be undone.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="deleteDialog = false"
                    >
                      No
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="deleteUser(user.id), deletedUser = true, deletedUsername = user.firstName + ' ' + user.lastName, deleteDialog = false"
                    >
                      Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-layout>
    </div>
    <v-snackbar
      v-model="deletedUser"
      top
      :timeout="3000"
    >
      {{deletedUsername}} has been deleted
      <v-btn
        color="red"
        text
        @click="deletedUser = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="resetPass"
      top
      :timeout="3000"
    >
      Password has been reset for {{resetPassUser}}
      <v-btn
        color="red"
        text
        @click="resetPass = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="saveUser"
      top
      :timeout="3000"
    >
      Email has been updated for {{saveUserName}}
      <v-btn
        color="red"
        text
        @click="saveUser = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
// @ is an alias to /src
import {HTTP} from '@/api/http-common';

export default {
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      valid: true,
      resetPass: false,
      saveUser: false,
      saveUserName: '',
      resetPassUser: '',
      deletedUser: '',
      deletedUsername: '',
      loggedInUser: [],
      selectableGroups: [],
      selectedGroups: [],
      finalUsers: [],
      newUser: {},
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      cameras: [],
      users: [],
      camErrors: [],
      userErrors: [],
      groups: [
        {
          id: 0,
          firstName: "Trevor",
          lastName: "Allen",
          email: "trevor@woodlandhills.com",
          groups: [
            {
              id: 0,
              name: "Woodland Hills"
            }
          ]
        },
        {
          id: 1,
          firstName: "Miranda",
          lastName: "Taylor",
          email: "miranda@woodlandhills.com",
          groups: [
            {
              id: 0,
              name: "Woodland Hills"
            }
          ]
        },
        {
          id: 2,
          firstName: "Kyle",
          lastName: "Neal",
          email: "kyle@woodlandhills.com",
          groups: [
            {
              id: 0,
              name: "Woodland Hills"
            }
          ]
        }
      ],
      sampleUser: [
        {
          id: 1234
        }
      ]
    }
  },
  created() {
    this.getLoggedInUser().then(() =>{
      let users = []
      if(this.loggedInUser.groups.length >= 1){
        this.loggedInUser.groups.forEach(function(group){
          HTTP.get(`user/admin/list/${group.id}`).then(response => {
            console.log('Get users from Group', group.id, ': ', JSON.stringify(response.data))
            response.data.forEach(function(indv){
              if(users.some(user => user.id === indv.id)){
                console.log('hello', indv.firstName)
              }
              else {
                console.log(indv.firstName)
                users.push(indv)
              }
            })
          })
          // getUsersByGroup(group.id).then((usersInGroup) => {
          //   console.log(usersInGroup)
          //   this.users.push(usersInGroup)
          // })
          // .catch(e => {
          //   console.log(e)
          // })
        })
      }
      this.finalUsers = users
    }).catch(e => {
      console.log(e)
    });
        // HTTP.get(`camera/list/1234`)
        // .then(response => {
        //     this.cameras = response.data
        //     console.log(JSON.stringify(this.cameras))
        // })
        // .catch(e => {
        //     this.camErrors.push(e)
        // })

    // HTTP.get(`user/admin/list/0`)
    // .then(response => {
    //     console.log(response.data)
    //     this.groups = response.data
    //     console.log(JSON.stringify(this.groups))
    // })
    // .catch(e => {
    //     this.userErrors.push(e)
    // })
  },
  mounted() {},
  methods: {
    getLoggedInUser: function(){
      return HTTP.get(`user/1`).then(response => {
        this.loggedInUser = response.data
        console.log('Get logged in user: ', JSON.stringify(this.loggedInUser))
      })
    },
    getUsersByGroup: function(groupID){
      return HTTP.get(`user/admin/list/${groupID}`).then(response => {
        console.log('Get users from Group: ', JSON.stringify(response.data))
      })
    },
  //Set the camera type based on the status of the cameras. This 'type' is used for coloring 
    saveChanges: function(email, id){
      console.log('save the email to be', email, 'for user', id)
    },
    resetPassword: function(id){
      console.log('reset the password for user with id of ', id)
    },
    deleteUser: function(id){
      console.log('user to delete has ID of: ', id)
      HTTP.delete('/user/admin', {
        params: {
          userId:id
        }
      })
    },
    getGroups: function(user){
      console.log('get groups for admin user ', user.id)
      this.selectableGroups = user.groups
      console.log('this.selectable', JSON.stringify(this.selectableGroups))
    },
    toggleGroup: function (group) {
      if (this.selectedGroups.includes(group)) {
        // Removing the group
        this.selectedGroups.splice(this.selectedGroups.indexOf(group), 1);
      } else {
        this.selectedGroups.push(group);
      }
    },
    createNewUser: function(){
      let newUser = this.newUser
      newUser.groups = []
      newUser.groups = this.selectedGroups
      console.log('User info ', JSON.stringify(newUser))
      HTTP.post('user/admin', {
        "firstName": newUser.firstName,
        "lastName": newUser.lastName,
        "groups": newUser.groups,
        "email": newUser.email,
        "password": newUser.password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.newUser = {}
      this.selectedGroups = []
    }
  }
}
</script>
