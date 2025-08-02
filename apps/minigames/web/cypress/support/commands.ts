/// <reference types="cypress" />

Cypress.Commands.add('loginWithCredentials', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[placeholder="Correo electrónico"]').type(email);
  cy.get('input[placeholder="Contraseña"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('loginDefault', () => {
  cy.loginWithCredentials('user@mingo.com', '12345678');
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
