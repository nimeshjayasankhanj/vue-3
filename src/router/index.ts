import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EndToEnd from '@/views/EndToEnd.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bar-d3',
      name: 'bar-d3',
      component: () => import('@/views/BarChartD3.vue')
    },
    {
      path: '/pie-d3',
      name: 'pie-d3',
      component: () => import('@/views/PieChartD3.vue')
    },
    {
      path: '/donut-d3',
      name: 'donut-d3',
      component: () => import('@/views/DonutChartD3.vue')
    },
    {
      path: '/dot-d3',
      name: 'dot-d3',
      component: () => import('@/views/DotChartD3.vue')
    },
    {
      path: '/line-d3',
      name: 'line-d3',
      component: () => import('@/views/LineChartD3.vue')
    },
    {
      path: '/unit-test',
      name: 'unit-test',
      component: () => import('@/views/UnitTests.vue')
    },
    {
      path: '/end-to-end',
      name: 'end',
      component: EndToEnd
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
