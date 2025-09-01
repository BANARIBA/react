# Configuracion de Vitest
[Vitest Link](https://vitest.dev)
[Testing library](https://testing-library.com)
- Install ```npm install -D vitest```
- Install ```npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom1```
- Agregar esto es la zona de scripts del package.json
```"test": "vitest", "test:ui": "vitest --ui", "coverage": "vitest run --coverage"```
- Ir a vite.config
```
  import { defineConfig } from 'vitest/config'
  import react from '@vitejs/plugin-react-swc'

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
    }
  })
```