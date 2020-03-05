<template>
  <div class="dashboard">
    <h1 large class="display-3 text-center pa-8" center>Woodland Hills</h1>
    <v-layout align-center justify-center row fill-height>
      <v-expansion-panels accordion hover style="maxWidth: 800px;">
        <v-expansion-panel v-for="cameras in myCameras" :key="cameras.cameraId" v-on:click="checkCameraStatus()">
          <v-expansion-panel-header disable-icon-rotate>
            <template v-slot:actions>
              <!-- TODO: Move this logic to a methods section in the <script> below -->
              <v-icon v-if="cameras.status === 'good'" color="teal">check_circle</v-icon>
              <v-icon v-else-if="cameras.status === 'warning'" color="warning">warning</v-icon>
              <v-icon v-else-if="cameras.status === 'error'" color="error">error</v-icon>
              <v-icon v-else color="#2196F3">info</v-icon>
            </template>
            {{cameras.title}}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="grey--text">
            <v-card>
              <v-card
                class="mx-auto"
                outlined
              >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">{{ cameras.headline }}</div>
                      <v-list-item-title class="headline mb-1">{{ cameras.title }}</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-alert text v-bind:type="cameras.type">The camera status is {{cameras.status}}</v-alert>
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <!-- <v-list-item-avatar
                      tile
                      size="80"
                    >
                      <v-img :src="cameras.avatar"></v-img>
                    </v-list-item-avatar> -->
                  </v-list-item>
                <iframe v-if="cameras.video" width="560" height="315" v-bind:src="cameras.video" frameborder="0"/>
                <div>
                  <div class="pl-4 pa-1">Logitude: {{cameras.longitude}}, Latitude: {{cameras.latitude}}</div>
                  <div class="pl-4 pa-1 pb-2">View on <a :href="`https://www.google.com/maps/search/?api=1&query=${cameras.latitude},${cameras.longitude}&query_place_id=${cameras.placeId}`" target="_blank">Google Maps</a></div>
                </div>  
              </v-card>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
//import {HTTP} from '@/api/http-common';

export default {
  data() {
    return{
      cameras: [
        {
          title: 'Fire Department North', 
          headline: 'The north facing camera placed on the Woodland Hills Fire Department',
          cameraId: '12345', 
          latitude: 40.0116236, 
          longitude: -111.6503782, 
          placeId: 'ChIJRa6brry6TYcRZ4_9eCvq10g',
          status: 'good', 
          type: '',
          video: 'https://rtsp.me/embed/HySsFh8T/',
          avatar: 'https://utahvalley360.com/wp-content/uploads/2017/11/Mountains.jpg'
        },
        {
          title: 'Fire Department West', 
          headline: 'The west facing camera placed on the Woodland Hills Fire Department',
          cameraId: '67890', 
          latitude: 40.0116236,
          longitude: -111.6503782, 
          placeId: 'ChIJRa6brry6TYcRZ4_9eCvq10g',
          status: 'good', 
          type: '',
          video: 'https://rtsp.me/embed/HySsFh8T/',
          avatar: 'https://m1.cbhomes.com/p/952/1639481/0073a14b0d694c5/pdl23tp.jpg'
        },
        {
          title: 'Lauritzen Field East', 
          headline: 'The east facing camera placed at the Lauritzen Field Park',
          cameraId: '13579', 
          latitude: 40.001940, 
          longitude: -111.657140, 
          placeId: 'ChIJrxJwKai6TYcRNWd4dveSzmY',
          status: 'warning', 
          type: null,
          video: null,
          avatar: 'https://utahvalley360.com/wp-content/uploads/2017/11/lauritzen-field.jpg'
        },
        {
          title: 'Lauritzen Field West', 
          headline: 'The west facing camera placed at the Lauritzen Field Park',
          cameraId: '24680', 
          latitude: 40.0088132,
          longitude: -111.6528565,
          placeId: 'ChIJrxJwKai6TYcRNWd4dveSzmY',
          status: 'error', 
          type: null,
          video: null,
          avatar: 'https://m1.cbhomes.com/p/952/1639481/0073a14b0d694c5/pdl23tp.jpg'
        },
        {
          title: 'Woodland Hills LDS Church', 
          headline: 'The east facing camera placed at the LDS Church in Woorland Hills',
          cameraId: '124578', 
          latitude: 40.0285415,
          longitude: -111.6545793,
          placeId: 'ChIJlWeZCca6TYcRp-4qJp4INWo',
          status: 'unknown', 
          type: null,
          video: null,
          avatar: 'https://lh5.googleusercontent.com/p/AF1QipOFAczQHpvUfyDFXgvc8G6K2_B3neuneC-Aineg=w408-h544-k-no'
        },
      ]
    }
  },
  methods: {
    //Set the camera type based on the status of the cameras. This 'type' is used for coloring 
    checkCameraStatus: function(){
      this.cameras.forEach(cam => {
        switch(cam.status){
          case 'good':
            cam.type = 'success'
            break;
          case 'warning':
            cam.type = 'warning'
            break;
          case 'error':
            cam.type = 'error'
            break;
          default:
            cam.type = 'info'
            break;
        }
      });
    }
  },
  // watch: {
  //   myCameras: {
  //     handler: function (){
  //       switch(this.cameras.status){
  //         case 'good':
  //           this.cameras.type = 'success'
  //           break;
  //         case 'warning':
  //           this.cameras.type = 'warning'
  //           break;
  //         case 'error':
  //           this.cameras.type = 'error'
  //           break;
  //       }
  //     }
  //   }
  // },
  computed: {
    myCameras() {
      // return this.cameras.filter(cameras => {
      //   return cameras.status === 'Good'
      // })
      return this.cameras
    }
  }

}
</script>
