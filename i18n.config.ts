import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {NativeModules, Platform} from 'react-native';

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ??
      NativeModules.SettingsManager.settings.AppleLanguages[0] ??
      'en'
    : NativeModules.I18nManager.localeIdentifier;

import en from './translations/en.json';
import pt from './translations/pt.json';

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: locale?.substring(0, 2),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
