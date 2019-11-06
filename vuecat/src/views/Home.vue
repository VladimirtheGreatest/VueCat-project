<template>
  <div class="home">
       <v-container fluid >
         <v-row >
         <v-col class="mb-5" sm="12" md="12" xs="12">
         <div :class="{'mt-5': $vuetify.breakpoint.smAndDown, 'ml-10 mt-10': $vuetify.breakpoint.mdAndUp}"> <!--specifying breakpoints-->
         <h2 :class="{'text-center font-weight-light pink--text': $vuetify.breakpoint.smAndDown, 'pink--text text-left font-weight-light': $vuetify.breakpoint.mdAndUp}">Trying to decide <span class="font-weight-bold">what type of cat is right for you</span> and your family?</h2>
         <h1 id="huge" :class="{'text-center': $vuetify.breakpoint.smAndDown, 'text-left': $vuetify.breakpoint.mdAndUp}"><span class="font-weight-bold">Browse through our list of cat breeds using our Vue</span><b class="pink--text">Cat</b><br><span class="font-weight-light"> tool, and find the best cat for you.</span></h1>
            </div>
              </v-col>
              </v-row>
              <v-row >
                <v-col class="mb-5" sm="12" md="12" xs="12">
                  <v-layout class="mb-5" align-center justify-center>
                     <v-btn class="pink font-weight-bold my-12" dark large @click="loadNextImage" >
                    See another cutie &nbsp; <v-icon>refresh</v-icon>
                   </v-btn>
                    </v-layout>

                   <v-layout>
                     <v-flex xs12 >
                        <v-progress-circular v-if="loading" :size="100" indeterminate color="pink"></v-progress-circular>
                       <v-card v-else class="mx-auto mb-5" max-width="900" height="600" outlined elevation="24" rounded >
                        <v-img id="card" :src="image.url" max-width="900" height="600">
                        </v-img>
                        </v-card>
                       </v-flex>
                       </v-layout>
                     </v-col>
                    </v-row>
       </v-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios';
export default {
  data () {
    return {
          image: { url: ""},
             loading : true
    }
  },
        created(){
            this.loadNextImage();
        } ,
        methods:{
            async loadNextImage() {
                try{  
                    Swal.fire({
                    title: 'fetching from API....meowwwwww',
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
                    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } ) // Ask for 1 Image, at full resolution
                    this.image = response.data[0]               
                       this.loading = false
                }catch(err){
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
  </style>