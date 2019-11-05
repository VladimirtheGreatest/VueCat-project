<template>
  <nav>
         <!--navbar-->
    <v-app-bar app class="purple accent-2">
         <v-app-bar-nav-icon class="black--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Vue</span>
        <span>Cat</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
          <v-icon left>apps</v-icon>
        <span color="black">Log in</span>
             <!--navbar top end-->
      </v-btn>
    </v-app-bar>
          <!--navbar links-->
     <v-navigation-drawer left app v-model="drawer" class="purple accent-2">
        <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-icon>
            <v-icon class="black--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="black--text">{{ link.text }}</v-list-item-title>
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
        { icon: 'category', text: 'Categories', route: '/categories' }
      ]
    }
  }
}
</script>