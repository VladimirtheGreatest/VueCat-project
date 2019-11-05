<template>
  <div class="home">
       <v-container fluid >
         <div class="mt-10 ml-10 mb-5">
         <h3 class="pink--text text-left font-weight-light">Trying to decide <span class="font-weight-bold">what type of cat is right for you</span> and your family?</h3>
         <h1 class="text-left"><span class="font-weight-bold">Browse through our list of cat breeds using our Vue</span><b class="pink--text">Cat</b><br><span class="font-weight-light"> tool, and find the best cat for you.</span></h1>
            </div>
              <v-row >
                <v-col class="mb-5" sm="12" md="12" xs="12">
                  <v-layout class="mb-5" align-center justify-center>
                     <v-btn class="pink font-weight-bold" dark large @click="loadNextImage" >
                    See another cutie &nbsp; <v-icon>refresh</v-icon>
                   </v-btn>
                    </v-layout>

                   <v-layout row wrap>
                     <v-flex xs12 >
                        <v-progress-circular v-if="loading" :size="100" indeterminate color="pink"></v-progress-circular>
                       <v-card v-else class="mx-auto mb-5" max-width="900" height="600" outlined elevation="24" rounded >
                        <v-img :src="image.url" max-width="900" height="600">
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
                      position: 'center',
                      icon: 'success',
                      title: 'MEOOOOOOWWWWWWW',
                      showConfirmButton: false,
                      timer: 2000
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
