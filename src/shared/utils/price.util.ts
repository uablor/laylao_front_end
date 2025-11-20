export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("lo-LA", {
    style: "currency",
    currency: "LAK",
    minimumFractionDigits: 0,
  }).format(value || 0);
};// Utility Functions
export const calculatePercentage = (value: any, total: any): string => {
  const val = Number(value) || 0;
  const tot = Number(total) || 0;
  if (tot === 0) return "0";
  return ((val / tot) * 100).toFixed(1);
};

// src/utils/formatPrice.ts
export function formatPriceLAK(value: number | string): string {

  if (!value && value !== 0) return '₭0';

  const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    console.log("value", value);
  return new Intl.NumberFormat('lo-LA', {
    style: 'currency',
    currency: 'LAK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
}
