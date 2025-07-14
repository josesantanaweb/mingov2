export const isToday = (date: string | Date): boolean => {
  const formatDate = new Date(date);
  const now = new Date();
  return (
    formatDate.getDate() === now.getDate() &&
    formatDate.getMonth() === now.getMonth() &&
    formatDate.getFullYear() === now.getFullYear()
  );
};

export const isTomorrow = (date: string | Date): boolean => {
  const formatDate = new Date(date);
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  return (
    formatDate.getDate() === tomorrow.getDate() &&
    formatDate.getMonth() === tomorrow.getMonth() &&
    formatDate.getFullYear() === tomorrow.getFullYear()
  );
};

export const formatHour = (date: string | Date): string => {
  const formatDate = new Date(date);
  return new Intl.DateTimeFormat('es-VE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Caracas',
  }).format(formatDate);
};

export const formatDay = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  if (isToday(date)) return 'hoy';
  if (isTomorrow(date)) return 'mañana';

  return new Intl.DateTimeFormat('es-VE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    timeZone: 'America/Caracas',
  })
    .format(date)
    .replace('.', '');
};

export const formatRelativeTime = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Ahora';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `Hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `Hace ${diffInWeeks} semana${diffInWeeks !== 1 ? 's' : ''}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `Hace ${diffInMonths} mes${diffInMonths !== 1 ? 'es' : ''}`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `Hace ${diffInYears} año${diffInYears !== 1 ? 's' : ''}`;
};
