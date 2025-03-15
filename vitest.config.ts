import { defineConfig, coverageConfigDefaults } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    setupFiles: './src/setupTests.tsx',
    mockReset: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['src/test/mocks/**', ...coverageConfigDefaults.exclude]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@context': resolve(__dirname, './src/context'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@assets': resolve(__dirname, './src/assets'),
      '@utils': resolve(__dirname, './src/utils'),
      '@data': resolve(__dirname, './src/data')
    }
  },
  plugins: [
    {
      name: 'load-svg',
      enforce: 'pre',
      load(id) {
        if (id.endsWith('.svg?react'))
          return {
            code: `
            import React from 'react';
            const SvgComponent = () => React.createElement('svg', { 'data-testid': 'mock-svg' });
            export default SvgComponent;
          `
          }
        else if (id.endsWith('.svg'))
          return {
            code: 'export default "mock-svg"'
          }
      }
    }
  ]
})
