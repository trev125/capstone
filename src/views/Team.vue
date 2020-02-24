<template>
  <div class="team">
    <h1 large class="display-3 text-center pa-8" center>Team</h1>
    <ul v-if="cameras">
        <li v-for="camera in cameras" :key="camera.id">
            <p><strong>{{camera.id}}</strong></p>
            <p>{{camera.name}}</p>
            <p>{{camera.coordinates}}</p>
            <p>{{camera.status}}</p>
            <p>{{camera.alerts}}</p>
            <p>{{camera.alerts.length}}</p>
            <div v-if="camera.alerts.length > 0">
                <p>{{camera.alerts.status}}</p>
                <p>{{camera.alerts.alertType}}</p>
                <p>{{camera.alerts.message}}</p>
                <p>{{camera.alerts.timeStamp}}</p>
            </div>
            <p>{{camera.streams.url}}</p>
        </li>
    </ul>
    <ul v-if="users">
        <li v-for="user in users" :key="user.id">
            <p><strong>{{user.id}}</strong></p>
            <p>{{user.name}}</p>
        </li>
  </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import {HTTP} from '@/api/http-common';

export default {
    data() {
    return {
        cameras: {},
        users: {},
        camErrors: [],
        userErrors: [],
        sampleUser: [
            {
                id: '1234'
            }
        ]
    }
  },
    created() {
        // HTTP.get(`user/${this.sampleUser.id}`)
        // .then(response => {
        //     this.users = response.data
        //     console.log(this.users)
        // })
        // .catch(e => {
        //     this.errors.push(e)
        // })
        HTTP.get(`camera/list/${this.sampleUser.id}`)
        .then(response => {
            this.cameras = response.data
            console.log(JSON.stringify(this.cameras))
        })
        .catch(e => {
            this.camErrors.push(e)
        })

        HTTP.get(`user/admin/list/${this.sampleUser.id}`)
        .then(response => {
            console.log(response.data)
            this.users = response.data
            console.log(JSON.stringify(this.users))
        })
        .catch(e => {
            this.userErrors.push(e)
        })
    }
}
</script>
