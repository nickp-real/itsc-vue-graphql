import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article/:articleId/read-more',
      name: 'article-read-more',
      component: () => import('../views/ReadMoreView.vue')
    },
    {
      path: '/article/:articleId/edit',
      name: 'article-edit',
      props: { mode: 'Update' },
      component: () => import('../views/EditView.vue')
    },
    {
      path: '/article/create',
      name: 'article-create',
      props: { mode: 'Create' },
      component: () => import('../views/EditView.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
