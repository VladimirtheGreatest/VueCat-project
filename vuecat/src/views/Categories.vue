<template>
<div class="Categories">
  <v-progress-circular v-if="loading" :size="100" indeterminate color="pink"></v-progress-circular>
  <v-container fluid v-else>
    <v-row class="my-12 py-12">
      <v-col class="mb-5" sm="12" md="12" xs="12">
        <div :class="{'mx-2 mt-5': $vuetify.breakpoint.smAndDown, 'mt-10': $vuetify.breakpoint.mdAndUp}">
          <!--specifying breakpoints-->
          <h3 class="pink--text text-center font-weight-light">In ancient times <span class="font-weight-bold">cats were worshipped as gods</span></h3>
          <h1 class="text-center"><span class="font-weight-bold">They have not forgotten this.</span><br><span class="font-weight-light"> Always remember, time spent with cats is never wasted.</span></h1>
        </div>
      </v-col>
    </v-row>
    <v-container>
      <v-layout row wrap align-center>
        <!-- Order selection - Randpm, Descending, or Ascending -->
        <v-flex xs12 md6 class="mx-auto py-12">
          <v-select :items="categories" item-text="name" v-model="selected_category" label="Categories" return-object outlined dense attach>
          </v-select>
        </v-flex>
      </v-layout>
      <v-layout>
        <!-- for loop through the results from the API -->
        <v-row :class="{'mx-1': $vuetify.breakpoint.smAndDown, 'mx-3': $vuetify.breakpoint.mdAndUp}">
          <v-flex xs12 md6 sm12 v-for="n in images" :key="n.id">
            <v-img :class="{'my-3': $vuetify.breakpoint.smAndDown, 'mr-3 my-1': $vuetify.breakpoint.mdAndUp}" id="card" :src="n.url" max-width="1000" max-height="600" aspect-ratio="1">
            </v-img>
          </v-flex>
          <h1 class="text-left my-12 py-12 mx-auto"><span id="huge" class="font-weight-bold">Choose your category</span><br><span class="font-weight-light">Think about all those<span class="font-weight-bold pink--text"> beautiful moments</span> you
              could <span class="font-weight-bold">spend together</span></span></h1>
        </v-row>
      </v-layout>
      <br>
      <!-- Pagination control -->
      <v-layout>
        <v-row>
          <v-col sm="6" md="4" xs="4" class="mx-auto">
            <v-card-title primary-title>
              <div class="mx-auto">
                <h2>Page</h2>
              </div>
            </v-card-title>
            <v-pagination v-show="order!='Rand'" v-model="page" :length="getNumPages" circle total-visible="8" color="pink"></v-pagination>
          </v-col>
        </v-row>
      </v-layout>
      <v-layout>
        <v-row>
          <v-col sm="6" md="4" xs="12" class="mx-auto py-12">
            <v-select :items="[2,4,8]" v-model="limit" label="Limit" outlined dense attach></v-select>
          </v-col>
        </v-row>
      </v-layout>

      <!-- Next btn only shown when Rand is select as it can't be paginated -->
      <v-row>
        <v-col sm="12" md="6" xs="12">
          <v-btn color="blue" v-show="order=='Rand'" large @click="nextBtn">
            <v-icon>refresh</v-icon> &nbsp; More
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
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
            categories: [],
            selected_category:{},
            images: [],
            order:'Desc',
            page: 1,
            limit: 2,
            pagination_count: 0, //default until we get a result with the 'Pagination-Count' header in the response
    }
  },
        created(){
            this.getCategories();
            //this.getImages();
        } ,
        watch: {
            // if the user changes any of these values, then make a new request to the API
            page: function()
            {
                this.getImages();
            },
            limit: function()
            {
                this.getImages();
            },
            order: function()
            {
                this.getImages();
            },
            selected_category: function()
            {
                console.log(this.selected_category)
                this.getImages();
            }
        },
        computed:{
            getNumPages: function()
            {
            return Math.floor(this.pagination_count / this.limit) | 0;
            }
        },
        methods:{
            async nextBtn()
            {
                this.page++;
                await this.getImages();
            },
            async getCategories()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "91a07ee8-70f3-4a3d-9296-0c6ca54428ef"

                    let response = await axios.get('https://api.thecatapi.com/v1/categories/' )
                    this.categories = response.data;
                     this.loading = false

                    // pick one to display initially
                    this.selected_category = this.categories[2]
                }catch(err){
                    console.log(err)
                      this.loading = false
                }
            },
            async getImages()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "91a07ee8-70f3-4a3d-9296-0c6ca54428ef" //

                    let query_params = {
                        limit: this.limit,
                        order: this.order,
                        page: this.page-1,
                        category_ids: this.selected_category.id
                    }
                    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params } )

                    this.pagination_count = response.headers['pagination-count'];
                    this.images = response.data
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
    -webkit-box-shadow: 5px 5px 44px 39px rgba(255,105,180,0.27);
    box-shadow: 5px 5px 44px 39px rgba(255,105,180,0.27);
  }
  #huge{
      font-size: 52px;
  }
  @media (max-width: 480px) {
    #huge{
        font-size: 38px;
    }
  }

  </style>
