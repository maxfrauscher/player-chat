import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Room from '../views/Room.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/room',
    name: 'Room',
    component: Room

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
