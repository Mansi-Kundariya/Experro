import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { CommonUtilities } from 'experro-storefront';
import { exp_lang as languages } from '../locale';

function transformLanguageCode(code: string) {
  try {
    if (code.includes('-')) {
      return code
        .split('-') // Split the code by hyphens
        .map((part, index) =>
          index === 0 ? part.toLowerCase() : part.toUpperCase()
        ) // Convert the first part to lowercase and subsequent parts to uppercase
        .join('-'); // Join the parts back together with a hyphen
    } else {
      return code.toLowerCase();
    }
  } catch {
    return code;
  }
}

export function handleI18() {
  if (!languages) {
    return;
  }
  let selectedLanguage = 'en';
  selectedLanguage = transformLanguageCode(CommonUtilities.getLanguage());

  //check if selected language has been provided to config or not
  if (
    !(selectedLanguage in languages) ||
    selectedLanguage?.toLowerCase() === 'en-gb'
  ) {
    selectedLanguage = 'en';
  }

  try {
    i18n.use(initReactI18next).init({
      resources: {
        ...languages,
      },
      lng: selectedLanguage,
    });
  } catch {
    console.error('Something went wrong while Handling i18n');
  }
}
