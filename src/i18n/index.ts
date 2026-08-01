import en from './en.json';

type TranslationKeys = typeof en;

const translations: Record<string, any> = {
  en
};

export function translate(key: string, lang: string = 'en'): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; 
    }
  }

  return typeof value === 'string' ? value : key;
}