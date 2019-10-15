import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import teacherChildren from './teacherChild'
import studentChildren from './studentChild'
const TeacherHome = () => import('../views/Teacher/TeacherHome.vue')
const StudentHome = () => import('../views/Student/StudentHome.vue')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/teacher',
      component: TeacherHome,
      children: teacherChildren
    },
    {
      path: '/student',
      component: StudentHome,
      children: studentChildren
    }
  ]
})
