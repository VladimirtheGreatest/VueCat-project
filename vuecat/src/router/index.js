import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Breeds from '../views/Breeds.vue'
import Categories from '../views/Categories.vue'
import AddCat from '../views/AddCat.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Breeds',
    name: 'breeds',
    component: Breeds
  },
  {
    path: '/Categories',
    name: 'categories',
    component: Categories
  },
  {
    path: '/AddCat',
    name: 'addcat',
    component: AddCat
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
