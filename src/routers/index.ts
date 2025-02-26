import type { RouteRecordRaw } from 'vue-router'
import { fetchChildrenRoutes } from '@/utils/router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/home-view.vue'),
    children: [...fetchChildrenRoutes()],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export async function setupRouter(app: any) {
  app.use(router)
  await router.isReady()
}
