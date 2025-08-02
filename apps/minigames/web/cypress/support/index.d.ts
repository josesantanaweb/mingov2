/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Realiza login con credenciales específicas
     */
    loginWithCredentials(email: string, password: string): Chainable<void>;

    /**
     * Realiza login con credenciales por defecto
     */
    loginDefault(): Chainable<void>;

    /**
     * Intercepta y mockea la respuesta de login exitoso
     */
    mockLoginSuccess(): Chainable<void>;

    /**
     * Intercepta y mockea un error de login
     */
    mockLoginError(): Chainable<void>;
  }
}
