<template>
  <nav>
         <!--navbar-->
    <v-app-bar flat app>
         <v-app-bar-nav-icon class="pink--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Vue</span>
        <span class="pink--text font-weight-bold">Cat</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" class="pink white--text" text>
          <v-icon left>apps</v-icon>
        <span>Home</span>
             <!--navbar top end-->
      </v-btn>
    </v-app-bar>
          <!--navbar links-->
     <v-navigation-drawer left app v-model="drawer" class="pink">
        <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="black--text font-weight-bold">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
</v-list>
    </v-navigation-drawer>
     <!--navbar links end-->

  </nav>
</template>

<script>
export default {
  data() {
    return {
    drawer: false,
     links: [
        { icon: 'mood', text: 'Cats', route: '/' },
        { icon: 'group_work', text: 'Breeds', route: '/Breeds' },
        { icon: 'category', text: 'Categories', route: '/Categories' },
        { icon: 'add', text: 'Add cat', route: '/AddCat' }
      ]
    }
  }
}
</script>