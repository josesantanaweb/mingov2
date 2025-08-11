/// <reference types="cypress" />
import { ROUTES } from '@/constants';
describe('Complete Login & Authentication Flow', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    cy.clearLocalStorage();
  });

  describe('Form Validation', () => {
    it('should validate login form correctly', () => {
      cy.visit(ROUTES.LOGIN); // Ahora usa baseUrl automáticamente

      // Verificar que la página se carga correctamente
      cy.contains('Acceder').should('be.visible');
      cy.contains('Accede a tu cuenta').should('be.visible');

      // Verificar campos del formulario
      cy.get('input[placeholder="Correo electrónico"]').should('be.visible');
      cy.get('input[placeholder="Contraseña"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Iniciar Sesión');

      // Test: formulario vacío debería estar deshabilitado
      cy.get('button[type="submit"]').should('be.disabled');

      // Test: email inválido
      cy.get('input[placeholder="Correo electrónico"]').type('invalid-email');
      cy.get('input[placeholder="Contraseña"]').type('password123');
      cy.get('button[type="submit"]').should('be.disabled');

      // Test: contraseña muy corta
      cy.get('input[placeholder="Correo electrónico"]').clear().type('user@mingo.com');
      cy.get('input[placeholder="Contraseña"]').clear().type('123');
      cy.get('button[type="submit"]').should('be.disabled');

      // Test: datos válidos habilitan el botón
      cy.get('input[placeholder="Contraseña"]').clear().type('12345678');
      cy.get('button[type="submit"]').should('not.be.disabled');
    });

    it('should toggle password visibility', () => {
      cy.visit(ROUTES.LOGIN);

      // Ingresar contraseña
      cy.get('input[placeholder="Contraseña"]').type('mypassword');

      // Verificar que inicialmente es tipo password
      cy.get('input[placeholder="Contraseña"]').should('have.attr', 'type', 'password');

      // Hacer click en el icono para mostrar
      cy.get('input[placeholder="Contraseña"]').parent().find('[class*="icon"]').click();

      // Verificar que cambia a tipo text
      cy.get('input[placeholder="Contraseña"]').should('have.attr', 'type', 'text');
    });
  });

  describe('Authentication Flow', () => {
    it('should complete full login flow with JWT tokens', () => {
      // Usar comando personalizado para mockear login exitoso
      cy.mockLoginSuccess();

      // Realizar login usando comando personalizado
      cy.loginDefault();

      // Esperar respuesta
      cy.wait('@loginRequest');

      // Verificar redirección exitosa
      cy.url().should('include', '/coin-flip');
      cy.contains('Coin Flip').should('be.visible');

      // Verificar que los tokens se guardaron en localStorage
      cy.window().then((window) => {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        cy.wrap(accessToken).should('not.be.null');
        cy.wrap(refreshToken).should('not.be.null');
        cy.wrap(accessToken).should('include', 'eyJ'); // JWT starts with eyJ
        cy.wrap(refreshToken).should('include', 'eyJ');
      });
    });

    it('should handle login errors gracefully', () => {
      // Usar comando personalizado para mockear error
      cy.mockLoginError();

      // Intentar login con credenciales que fallarán
      cy.loginWithCredentials('wrong@email.com', 'wrongpassword');

      // Esperar respuesta de error
      cy.wait('@loginErrorRequest');

      // Verificar que permanece en login
      cy.url().should('include', ROUTES.LOGIN);

      // Verificar que no hay tokens en localStorage
      cy.window().then((window) => {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        cy.wrap(accessToken).should('be.null');
        cy.wrap(refreshToken).should('be.null');
      });
    });

    it('should handle logout correctly', () => {
      // Setup: simular usuario ya logueado
      cy.window().then((window) => {
        window.localStorage.setItem('accessToken', 'test-access-token');
        window.localStorage.setItem('refreshToken', 'test-refresh-token');
      });

      // Visitar página protegida
      cy.visit(ROUTES.MINI_GAMES.COINFLIP);

      // Hacer logout (asumiendo que hay un botón de logout)
      cy.get('[data-testid="logout-button"]').click();

      // Verificar que los tokens se limpiaron
      cy.window().then((window) => {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        cy.wrap(accessToken).should('be.null');
        cy.wrap(refreshToken).should('be.null');
      });

      // Verificar redirección a login
      cy.url().should('include', ROUTES.LOGIN);
    });
  });

  describe('Navigation', () => {
    it('should navigate to register page', () => {
      cy.visit(ROUTES.LOGIN);

      // Hacer click en el link de registro
      cy.contains('Regístrate').click();

      // Verificar navegación
      cy.url().should('include', '/register');
    });

    it('should redirect to login when accessing protected route without token', () => {
      // Intentar acceder a ruta protegida sin autenticación
      cy.visit(ROUTES.MINI_GAMES.COINFLIP);

      // Debería redirigir a login
      cy.url().should('include', ROUTES.LOGIN);
    });
  });

  describe('Real Backend Integration', () => {
    it('should work with real backend if available', () => {
      // Este test funciona con el backend real
      // Intercept para capturar la respuesta real (sin mockear)
      cy.intercept('POST', '**/graphql').as('realLogin');

      // Hacer login real
      cy.loginDefault();

      // Esperar respuesta del backend real
      cy.wait('@realLogin').then((interception) => {
        // Si el backend está disponible y el login es exitoso
        if (interception.response?.statusCode === 200) {
          // Verificar datos de respuesta
          const responseBody = interception.response.body;

          if (responseBody.data?.login) {
            // Login exitoso - verificar redirección
            cy.url().should('include', ROUTES.MINI_GAMES.COINFLIP);

            // Verificar que hay tokens reales
            cy.window().then((window) => {
              const accessToken = window.localStorage.getItem('accessToken');
              const refreshToken = window.localStorage.getItem('refreshToken');

              cy.wrap(accessToken).should('not.be.null');
              cy.wrap(refreshToken).should('not.be.null');
            });
          }
        } else {
          // Backend no disponible o error - verificar que maneja bien
          cy.url().should('include', ROUTES.LOGIN);
        }
      });
    });
  });

  describe('User Experience', () => {
    it('should provide good user experience flow', () => {
      // Test del flujo completo desde perspectiva del usuario

      // 1. Usuario llega a login
      cy.visit(ROUTES.LOGIN);
      cy.contains('Acceder').should('be.visible');

      // 2. Usuario intenta enviar formulario vacío
      cy.get('button[type="submit"]').should('be.disabled');

      // 3. Usuario llena email pero contraseña corta
      cy.get('input[placeholder="Correo electrónico"]').type('user@mingo.com');
      cy.get('input[placeholder="Contraseña"]').type('123');
      cy.get('button[type="submit"]').should('be.disabled');

      // 4. Usuario completa contraseña válida
      cy.get('input[placeholder="Contraseña"]').clear().type('12345678');
      cy.get('button[type="submit"]').should('not.be.disabled');

      // 5. Mock de login exitoso
      cy.mockLoginSuccess();

      // 6. Usuario hace submit
      cy.get('button[type="submit"]').click();

      // 7. Usuario es redirigido exitosamente
      cy.wait('@loginRequest');
      cy.url().should('include', ROUTES.MINI_GAMES.COINFLIP);

      // 8. Usuario ve la página de destino
      cy.contains('Coin Flip').should('be.visible');
    });
  });
});
