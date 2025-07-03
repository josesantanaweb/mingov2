export const MAX_BALLS = 5;
export const INTERVAL_BALLS = 4000;
export const BALANCE = 100;

// Routes
export const ROOM_ROUTE = (roomId: string) => `/rooms/${roomId}`;
export const MATCH_ROUTE = (matchId: string) => `/match/${matchId}`;
export const MARKET_ROUTE = (matchId: string, marketId: string) => `/match/${matchId}/market/${marketId}`;
export const HOME_ROUTE = '/';
export const ROOMS_ROUTE = '/rooms';
export const BETS_ROUTE = '/bets';
export const LOGIN_REDIRECT_ROUTE = '/rooms';
export const GAME_ROUTE = '/game';

// Users
export const MAX_USERS_TO_SHOW = 7;
