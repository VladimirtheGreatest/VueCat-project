<template>
<div class="home">
  <v-container fluid>
      <!--Landing page-->
    <v-row>
         <!--headings-->
      <v-col class="mb-5" sm="12" md="12" xs="12">
        <div :class="{'my-8': $vuetify.breakpoint.smAndDown, 'ml-10 mt-10': $vuetify.breakpoint.mdAndUp}">   <!--specifying breakpoints-->
          <h2 :class="{'text-center font-weight-light pink--text': $vuetify.breakpoint.smAndDown, 'pink--text text-left font-weight-light': $vuetify.breakpoint.mdAndUp}">Trying to decide <span class="font-weight-bold">what type of cat is right for
              you</span> and your family?</h2>
          <h1 id="huge" :class="{'text-center': $vuetify.breakpoint.smAndDown, 'text-left': $vuetify.breakpoint.mdAndUp}"><span class="font-weight-bold">Browse through our list of cat breeds using our Vue</span><b class="pink--text">Cat</b><br><span
              class="font-weight-light"> tool, and find the best cat for you.</span></h1>
        </div>
      </v-col>
           <!--headings end-->
    </v-row>
    <v-row>
       <!--Reload button with the image that we will get from the API-->
      <v-col class="mb-5" sm="12" md="12" xs="12">
        <v-layout class="mb-5" align-center justify-center>
          <v-btn :class="{'pink font-weight-bold mb-10': $vuetify.breakpoint.smAndDown, 'pink font-weight-bold mt-12 mb-5': $vuetify.breakpoint.mdAndUp}" dark large @click="loadNextImage">
            See another cutie &nbsp; <v-icon>refresh</v-icon>
          </v-btn>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <v-card class="mx-auto mb-5" max-width="800" max-height="500" outlined elevation="24" rounded>
                <v-progress-circular v-if="loading" :size="100" indeterminate color="pink"></v-progress-circular>        <!--loader-->
              <v-img v-else id="card" :src="image.url" max-width="800" max-height="500">
              </v-img>
            </v-card>
          </v-flex>
        </v-layout>
      </v-col>
         <!--Reload button with the image that we will get from the API end-->
    </v-row>
         <!--Landing page end-->
  </v-container>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios';
export default {
  data() {
    return {
      image: {
        url: ""     //url will be used as a source to the image, use image.url bracket notation
      },
      loading: true
    }
  },
  created() {   //component mounting
    this.loadNextImage();
  },
  methods: {
    async loadNextImage() {  //API request method to get a new image
      try {
        // loader that will be displayed while fetching image from the API
         Swal.fire({
          title: 'fetching from API..meoww',
          position: 'top',
          width: 600,
          padding: '3em',
          background: '#fff url(/images/trees.png)',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `
                      rgba(255,105,180,0.97)
                      url("https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif")
                      center
                      no-repeat

                    `
        })
        axios.defaults.headers.common['x-api-key'] = "91a07ee8-70f3-4a3d-9296-0c6ca54428ef"
        let response = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: {
            limit: 1,
            size: "full"
          }
        }) // Ask for 1 Image, at full resolution
        this.image = response.data[0]
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    }
  }
}
</script>

 <style scoped>
  #card{
    -webkit-box-shadow: 5px 5px 44px 39px rgba(255,105,180,0.57);
    box-shadow: 5px 5px 44px 39px rgba(255,105,180,0.57);
  }
  #huge{
      font-size: 42px;
  }
  @media (min-width: 480px) and (max-width: 1400px) {
    #huge{
      font-size: 37px;
    }
  }
  @media (max-width: 480px) {
    #huge{
      font-size: 30px;
    }
    #card{
    max-height: 300px;
    }
  }
  </style>
