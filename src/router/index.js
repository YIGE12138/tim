import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import ChatRoom from '../views/ChatRoom'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },
   {
     path:'/chatroom',
     name:'ChatRoom',
     component:ChatRoom,
     hidden:true
    }
]
const router = new VueRouter({
  routes
})

export default router
