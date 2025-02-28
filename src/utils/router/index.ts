import type { RouteRecordRaw } from 'vue-router'

export function fetchChildrenRoutes() {
  const modules = import.meta.glob('./modules/*.ts', { eager: true })
  const routesModules: RouteRecordRaw[] = Object.values(modules)
    .flatMap((module) => (module as Partial<{ default: RouteRecordRaw[] }>).default)
    .filter((route): route is RouteRecordRaw => route !== undefined)
  return routesModules
}
