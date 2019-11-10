<template>
  <v-app>
       <Navbar/>
    <v-content  class="text-center white">
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
   components: { Navbar },
  name: 'App',
  data () {
    return {
    }
  }
};
</script>

<style>
/*Global*/
*{
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
