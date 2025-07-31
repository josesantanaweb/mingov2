/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       loginByApi(): Chainable<void>;
//       visitWithAuth(url: string): Chainable<void>;
//       loginReal(email?: string, password?: string): Chainable<void>;
//     }
//   }
// }
// Cypress.Commands.add('loginByApi', () => {
//   // Configurar el interceptor ANTES de hacer el login
//   cy.intercept('POST', '/api/graphql', (req) => {
//     if (
//       req.body.operationName === 'Profile' ||
//       req.body.operationName === 'profile'
//     ) {
//       req.reply({
//         data: {
//           profile: {
//             id: 'mock-user-id',
//             name: 'Test User',
//             username: 'testuser',
//             balance: 1000,
//             email: 'user@mingo.com',
//             image: '/images/avatar.png',
//             refreshToken: 'mock-refresh-token',
//             role: 'USER',
//             createdAt: '2024-01-01T00:00:00.000Z',
//             updatedAt: '2024-01-01T00:00:00.000Z',
//           }
//         }
//       });
//     }
//   }).as('getProfile');

//   // Hacer el login
//   cy.request({
//     method: 'POST',
//     url: 'http://localhost:3001/api/auth/callback/credentials',
//     body: {
//       email: 'user@mingo.com',
//       password: '12345678',
//     },
//     form: true,
//   });
// });

// Cypress.Commands.add('visitWithAuth', (url: string) => {
//   // Configurar la sesión antes de visitar la página
//   cy.visit(url, {
//     onBeforeLoad: (win) => {
//       // Simular una sesión válida de NextAuth
//       const mockSession = {
//         user: {
//           id: 'mock-user-id',
//           email: 'user@mingo.com',
//           name: 'Test User',
//           image: '/images/avatar.png',
//         },
//         accessToken: 'mock-access-token',
//         refreshToken: 'mock-refresh-token',
//         expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
//       };

//       // Configurar localStorage para NextAuth
//       win.localStorage.setItem('next-auth.session-token', 'mock-session-token');
//       win.localStorage.setItem('next-auth.csrf-token', 'mock-csrf-token');

//       // Simular el estado de la sesión en el objeto window
//       (win as any).__NEXT_DATA__ = {
//         ...(win as any).__NEXT_DATA__,
//         props: {
//           ...(win as any).__NEXT_DATA__?.props,
//           session: mockSession,
//         },
//       };

//       // Simular el estado de useSession
//       (win as any).__NEXT_AUTH_SESSION__ = mockSession;
//     },
//   });
// });

// Cypress.Commands.add('loginReal', (email = 'user@mingo.com', password = '12345678') => {
//   // Hacer login real usando la API de autenticación
//   cy.request({
//     method: 'POST',
//     url: 'http://localhost:3001/api/auth/callback/credentials',
//     body: {
//       email,
//       password,
//     },
//     form: true,
//     failOnStatusCode: false,
//   }).then((response) => {
//     if (response.status === 200) {
//       cy.log('✅ Login real exitoso');
//     } else {
//       cy.log('⚠️ Login real falló, usando mock');
//     }
//   });
// });
// export {};
