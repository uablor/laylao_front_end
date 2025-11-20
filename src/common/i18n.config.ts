import { createI18n } from "vue-i18n"
import en from '../localization/en.json'
import la from '../localization/la.json'

const savedLocale = localStorage.getItem('app-locale') || 'la'


export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'la',
  messages: {
    en,
    la,
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true
      }
    },
    la: {
      currency: {
        style: 'currency',
        currency: 'LAK',
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true
      }
    },
  }
})
