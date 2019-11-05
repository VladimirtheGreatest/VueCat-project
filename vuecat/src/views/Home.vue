<template>
  <div class="home">
       <v-container fluid >
              <v-row >
                <v-col class="mb-5" sm="12" md="12" xs="12">
                  <v-layout class="mb-5" align-center justify-center>
                     <v-btn color="pink" dark large @click="loadNextImage" >
                    See another cutie &nbsp; <v-icon>refresh</v-icon>
                   </v-btn>
                    </v-layout>

                   <v-layout row wrap>
                     <v-flex xs12 >
                        <v-progress-circular v-if="loading" :size="100" indeterminate color="pink"></v-progress-circular>
                       <v-card v-else class="mx-auto mb-5" max-width="900" height="700" outlined elevation="24" rounded >
                        <v-img :src="image.url" max-width="900" height="700">
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
                    this.image = response.data[0] // the response is an Array, so just use the first item as the Image
                    console.log("-- Image from TheCatAPI.com")
                    console.log("id:", this.image.id)
                    console.log("url:", this.image.url)
                    console.log(this.image)
                       this.loading = false
                }catch(err){
                    console.log(err)
                    this.loading = false
                }
            }
        }
}
</script>
