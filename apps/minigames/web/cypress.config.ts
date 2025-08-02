import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Configurar URL base para todos los tests
    baseUrl: 'http://localhost:3001',

    // Configuraciones adicionales útiles
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,

    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
