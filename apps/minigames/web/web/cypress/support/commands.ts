/// <reference types="cypress" />
import { TEST_CONFIG } from './constants';
import { ROUTES } from '@/constants';

// Comando para login con credenciales específicas
Cypress.Commands.add('loginWithCredentials', (email: string, password: string) => {
  cy.visit(ROUTES.LOGIN);
  cy.get('input[placeholder="Correo electrónico"]').type(email);
  cy.get('input[placeholder="Contraseña"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Comando para login con credenciales por defecto
Cypress.Commands.add('loginDefault', () => {
  cy.loginWithCredentials(TEST_CONFIG.DEFAULT_EMAIL, TEST_CONFIG.DEFAULT_PASSWORD);
});

Cypress.Commands.add('mockLoginSuccess', () => {
  cy.intercept('POST', '**/graphql', (req) => {
    if (req.body.operationName === 'Login') {
      req.reply({
        data: {
          login: {
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
            user: {
              id: '1',
              email: 'user@mingo.com',
              username: 'testuser',
              name: 'Test User',
              image: '/images/avatar.png'
            }
          }
        }
      });
    }
  }).as('loginRequest');
});

Cypress.Commands.add('mockLoginError', () => {
  cy.intercept('POST', '**/graphql', (req) => {
    if (req.body.operationName === 'Login') {
      req.reply({
        errors: [{
          message: 'Invalid credentials',
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        }]
      });
    }
  }).as('loginErrorRequest');
});

export {};
