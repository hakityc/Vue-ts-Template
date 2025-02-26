import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// 全局设置
config.global.mocks = {
  // 模拟全局属性
}

// 设置全局 Mock
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useRoute: () => ({
    query: {},
    params: {},
  }),
}))
