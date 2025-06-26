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
