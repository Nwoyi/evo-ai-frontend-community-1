// US-first launch — USD/$. When we onboard non-US customers, switch to a
// per-account currency setting (account.currency from the Rails backend) or
// to a locale-driven mapping based on i18n.language.
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatSeconds = (value: number) => {
  if (!value || value <= 0) return '0s';
  if (value < 60) return `${Math.round(value)}s`;

  const minutes = Math.floor(value / 60);
  const seconds = Math.round(value % 60);
  return `${minutes}min ${seconds}s`;
};
