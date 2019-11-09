<template>
<div class="Breeds">
  <v-progress-circular v-if="loading" :size="100" indeterminate color="pink"></v-progress-circular>
  <v-container fluid v-else>

    <div id="main" class="py-12">
      <v-layout align-center justify-center>
        <v-flex>
          <div class="my-12">
            <h1 class="black--text font-weight-bold">Finding it hard to find the right cat?<br><span class="font-weight-light">Just to make things simpler.</span></h1>
          </div>

          <div class="flex-center my-12">
            <v-layout>
              <v-flex>
                <v-select :items="breeds" item-text="name" background-color="white" v-model="selected_breed" outlined prepend-icon="mood" return-object clearable rounded dense placeholder="Select your breed" attach></v-select>
              </v-flex>

            </v-layout>
          </div>

        </v-flex>

      </v-layout>


      <v-layout align-center justify-center>
        <v-flex xs12 md6 sm12>
          <v-card outlined id="breed">

            <v-carousel hide-delimiters>
              <v-carousel-item v-for="(item,i) in images" :key="i" :src="item.url"></v-carousel-item>
            </v-carousel>
            <v-card-title primary-title>

              <div class="text-xs-center">
                <v-chip class="mr-2" color="pink" text-color="white">
                  <v-avatar class="pr-2">
                    <img :src="country_flag_url" :alt="selected_breed.country_code">
                  </v-avatar>
                  {{selected_breed.origin}}
                </v-chip>
                <v-chip class="mr-2" v-if="selected_breed.experimental==1">Experimental</v-chip>
                <v-chip class="mr-2" v-if="selected_breed.rex==1">Rex</v-chip>
                <v-chip class="mr-2" v-if="selected_breed.natural==1">Natural</v-chip>
                <v-chip class="mr-2" v-if="selected_breed.rare==1">Rare</v-chip>
                <v-chip class="mr-2" v-if="selected_breed.hairless==1">Hairless</v-chip>
                <v-chip class="mr-2" v-if="selected_breed.suppressed_tail==1">Suppressed Tail</v-chip>
                <v-chip class="mr-2" v-if="selected_breed.short_legs==1">Short Legs</v-chip>
                <v-chip class="mr-2" v-if="selected_breed.hypoallergenic==1">Hypoallergenic</v-chip>
              </div>
              <div>
                <h2 class="font-weight-bold my-5">{{selected_breed.name}}</h2>
                <div id="text">{{selected_breed.description}}</div>
                <div>---</div>
                <div class="font-weight-bold pink--text"><i>{{selected_breed.temperament}}</i></div>
              </div>
            </v-card-title>


            <v-card-actions>
              <v-btn :href="selected_breed.wikipedia_url" target="_blank" color="pink white--text px-5 py-5">Wikipedia</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>


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
          country_flag_url:"",
          images: [],
          breeds:[],
          selected_breed: {},
          current_image: {}
          }
        },
        created(){
            this.getBreeds();
        } ,
        watch: {
            selected_breed: function()
            {
                let country_code = this.selected_breed.country_code.toLowerCase();
                this.country_flag_url = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${country_code}.svg`;
                this.getImages();
            }
        },
        methods:{
            async getBreeds()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "91a07ee8-70f3-4a3d-9296-0c6ca54428ef"
                    let response = await axios.get('https://api.thecatapi.com/v1/breeds/' )
                    this.breeds = response.data;
                    this.selected_breed = this.breeds[10]
                     this.loading = false
                }catch(err){
                    console.log(err)
                      this.loading = false
                }
            },
            async getImages()
            {
                try{

                    let query_params = {
                        breed_ids: this.selected_breed.id,
                        limit:4
                    }
                    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params} )
                    this.pagination_count = response.headers['pagination-count'];
                    this.images = response.data
                    this.current_image = this.images[0]
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
  #bold{
    font-weight: 900
  }
  h1{
    font-size: 42px;
  }
  #text{
    text-align: left;
    padding: 3%;
    font-weight:lighter;
  }
  #breed{
    -webkit-box-shadow: 5px 5px 44px 39px rgba(255,105,180,0.57);
    box-shadow: 5px 5px 44px 39px rgba(255,105,180,0.57);
  }
  @media (max-width: 480px) {
    h1{
      font-size: 30px;
    }
  }
  </style>
