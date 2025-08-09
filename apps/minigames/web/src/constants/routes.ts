export const ROUTES = {
  HOME: '/',
  SPORTS: '/sports',
  SPORTS_SOCCER: '/sports/soccer',
  SPORTS_BASEBALL: '/sports/baseball',
  SPORTS_BASKETBALL: '/sports/basketball',
  MINI_GAMES: '/mini-games',
  MINI_GAMES_LIMBO: '/mini-games/limbo',
  MINI_GAMES_COIN_FLIP: '/mini-games/coin-flip',
  MINI_GAMES_SLIDES: '/mini-games/slides',
  LOTTERIES: '/lotteries',
  AFFILIATES: '/affiliates',
  WEEKLY_DRAW: '/weekly-draw',
  BONUSES: '/bonuses',
  CHAT: '/chat',
  SUPPORT: '/support',
} as const;

export const MENU = [
  {
    label: 'Deportes',
    icon: 'soccer',
    path: ROUTES.SPORTS,
    submenu: [
      {
        icon: 'soccer',
        label: 'Fútbol',
        path: ROUTES.SPORTS_SOCCER,
      },
      {
        icon: 'baseball',
        label: 'Béisbol',
        path: ROUTES.SPORTS_BASEBALL,
      },
      {
        icon: 'basketball',
        label: 'Baloncesto',
        path: ROUTES.SPORTS_BASKETBALL,
      },
    ],
  },
  {
    label: 'Mini Juegos',
    icon: 'cards',
    path: ROUTES.MINI_GAMES,
    submenu: [
      {
        icon: 'limbo',
        label: 'Limbo',
        path: ROUTES.MINI_GAMES_LIMBO,
      },
      {
        icon: 'coin-flip',
        label: 'Cara o Sello',
        path: ROUTES.MINI_GAMES_COIN_FLIP,
      },
      {
        icon: 'layers',
        label: 'Slides',
        path: ROUTES.MINI_GAMES_SLIDES,
      },
    ],
  },
  {
    label: 'Loterías',
    icon: 'lottery',
    path: ROUTES.LOTTERIES,
  },
  {
    label: 'Afiliados',
    icon: 'affiliates',
    path: ROUTES.AFFILIATES,
  },
  {
    label: 'Sorteo Semanal',
    icon: 'lottery',
    path: ROUTES.WEEKLY_DRAW,
  },
  {
    label: 'Bonos',
    icon: 'gift',
    path: ROUTES.BONUSES,
  },
  {
    label: 'Chat',
    icon: 'chat',
    path: ROUTES.CHAT,
  },
  {
    label: 'Soporte',
    icon: 'support',
    path: ROUTES.SUPPORT,
  },
] as const;
