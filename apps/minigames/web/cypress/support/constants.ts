export const TEST_CONFIG = {
  DEFAULT_EMAIL: 'user@mingo.com',
  DEFAULT_PASSWORD: '12345678',

  DEFAULT_TIMEOUT: 10000,
  API_TIMEOUT: 15000,

  VIEWPORT_WIDTH: 1280,
  VIEWPORT_HEIGHT: 720,
} as const;

export const SELECTORS = {
  // Formulario de login
  EMAIL_INPUT: 'input[placeholder="Correo electrónico"]',
  PASSWORD_INPUT: 'input[placeholder="Contraseña"]',
  SUBMIT_BUTTON: 'button[type="submit"]',

  // Navegación
  REGISTER_LINK: 'text:Regístrate',
  LOGIN_LINK: 'text:Inicia Sesión',
  LOGOUT_BUTTON: '[data-testid="logout-button"]',

  // Páginas
  LOGIN_TITLE: 'text:Acceder',
  LOGIN_SUBTITLE: 'text:Accede a tu cuenta',
} as const;
