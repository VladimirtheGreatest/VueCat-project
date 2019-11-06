<template>
  <div class="AddCat">
    <v-progress-circular v-if="loading" :size="100" indeterminate color="pink"></v-progress-circular>
       <v-container fluid v-else>
           <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                       
                    <v-img :src="image_url" height="300px" v-if="image_url" contain></v-img>

                      
                        <input
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                        >
                    </v-flex>
                    <v-layout align-center justify-center>
                        <v-btn v-show="!uploading" color="pink" dark large @click="pickFile" >
                            Choose New Image &nbsp; <v-icon>upload</v-icon>
                        </v-btn>
                        <v-btn v-show="image_file && !uploading" color="blue" dark large @click="uploadFile" >
                            Upload &nbsp; <v-icon>upload</v-icon>
                        </v-btn>
                        <div v-show="uploading">Uploading</div>
                    </v-layout>
                </v-container>

                <v-container>


                    <v-alert v-show="error_message"
                    :value="true"
                    type="error"
                  >
                    {{error_message}}
                  </v-alert>
           </v-container>
   </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios';
export default {
         data () {
    return {
            loading : true,
            image_name:"",
            image_file:"",
            image_url:"",
            uploading:false,
            uploaded_image:{},
            error_message:null,
    }
  },
        created(){
           this.loading = false
        } ,
        methods:{
            pickFile () {
                this.error_message = null
                this.$refs.image.click ()
            },
            
            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.image_name = files[0].name
                    if(this.image_name.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.image_url = fr.result
                        this.image_file = files[0]
                    })
                } else {
                    this.image_name = ''
                    this.image_file = ''
                    this.image_url = ''
                }
            },
            async uploadFile() {
                Swal.fire({
                title: 'Do you really want to upload this image?',
                text: "Keep in mind it has to be the image of your cat, nobody wants to see your selfie!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    Swal.fire(
                    'Success!',
                    'Your file is on the way.',
                    'success'
                    )
                    uploadMe()
                }
                })

                 const uploadMe =  async () => {
                this.uploading = true;
                let formData = new FormData();
                formData.append('file',this.image_file);
                try{
                    axios.defaults.headers.common['x-api-key'] = "91a07ee8-70f3-4a3d-9296-0c6ca54428ef" // 
                    let response = await axios.post('https://api.thecatapi.com/v1/images/upload', formData, {headers: {'Content-Type':'multipart/form-data' }}) 
                    console.log(response.data)
                    this.uploaded_image = response.data
                    this.uploading = false;
                    this.image_file = null
                }catch(error){
                    console.log(error)
                    this.error_message = error.response.data.message
                    this.uploading = false;
                    this.image_file = null
                }
             }
            }
        }
}
  </script>