<template>
<div class="AddCat">
  <v-progress-circular v-if="loading" :size="100" indeterminate color="pink"></v-progress-circular>
  <v-container fluid v-else>

    <!-- Background image + headings -->
    <div id="largeImage">
      <v-row>
        <v-col sm="12" md="12" xs="12" class="description-box pr-10">
          <h1>Do you have any pictures of your loved ones <br> you would like to share with us?</h1>
          <h2>Feel free to upload your images here.</h2>

          <div id="imagecolumn">
            <div class="flex-center">
              <v-layout>
                  <v-flex>
                    <v-img class="my-3" :src="image_url" max-width="400px" max-height="300px" v-if="image_url" contain></v-img>
                    <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                  <v-btn class="mr-2" v-show="!uploading" color="pink" dark x-large @click="pickFile">
                    Choose New Image &nbsp; <v-icon>archive</v-icon>
                  </v-btn>
                  <v-btn v-show="image_file && !uploading" color="blue" dark x-large @click="uploadFile">
                    Upload &nbsp; <v-icon>archive</v-icon>
                  </v-btn>
                  <div v-show="uploading">Uploading</div>
                  <v-alert class="mt-2" v-show="error_message" :value="true" type="error">
                    {{error_message}}
                  </v-alert>
                </v-flex>
              </v-layout>
            </div>

          </div>
        </v-col>
      </v-row>
    </div>
    <!-- end of the Landing page with the background image-->
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
            uploadFile() {
                Swal.fire({
                title: 'Do you really want to upload this image?',
                text: "Keep in mind that it has to be the image of your cat, nobody wants to see your selfie!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, upload it!'
                }).then((result) => {
                if (result.value) {
                     let timerInterval
                    Swal.fire({
                    title: 'Uploading!',
                    html: '<b></b>',
                    timer: 2000,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('b')
                            .textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                    }
                    }).then((result) => {
                    if (
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        console.log('I was closed by the timer')
                    }
                    })
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
                     Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your image has been uploaded!',
                    })
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

  <style scoped>
  /*Main large image with the headings*/
#largeImage{
  width: 100%;
  height: 110vh;
  background: url('../images/cat.jpg') no-repeat left center/cover;
  background-color: white
}

#largeImage:after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	box-shadow: inset 50px 50px 50px #FF1493, inset -720px -100px 250px #FF1493;
}

#largeImage h1{
  font-size: 38px;
  font-weight: bold;
  text-align: right;
}

#largeImage h2{
  font-size: 28px;
  font-weight: lighter;
  text-align: right;
}

.description-box{
  color: black;
	z-index: 2;
	margin-top: 6rem;
}
#imagecolumn{
    display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
}
/*Main large image with the headings end*/

/*Media queries*/
@media (max-width: 900px) {
    #largeImage{
  width: 100%;
  height: 100%;
}
#imagecolumn{
    display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#largeImage h1{
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

#largeImage h2{
  font-size: 28px;
  font-weight: lighter;
  text-align: center;
}
.description-box{
  color: black;
	z-index: 2;
	margin-top: 3rem;
}
}
  </style>
