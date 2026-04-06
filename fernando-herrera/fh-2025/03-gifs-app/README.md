# Testing
1. [Vitest](https://vitest.dev/)
```npm i --save-dev vitest jsdom```

2. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
```npm i --save-dev @testing-library/react @testing-library/dom```

- __Todo en un solo comando__ ```npm i --save-dev vitest jsdom @testing-library/react @testing-library/dom```

3. Crear estos scripts en el package.json
```"scripts": { "test": "vitest", "test:ui": "vitest --ui", "coverage": "vitest run --coverage"}```

4. Configurar el vite.config.ts
```import { defineConfig } from 'vitest/config' import react from '@vitejs/plugin-react-swc' // https://vite.dev/config/ export default defineConfig({plugins: [react()], test:{environment: 'jsdom',  globals: true}})```

5. Axios mock adapter ```npm i --save-dev axios-mock-adapter```