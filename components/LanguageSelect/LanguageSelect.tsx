import React from 'react';
import { useI18n } from '@tinalabs/react-tinacms-i18n';
import languages from '../../lib/languages.json';

export const LanguageSelect: React.FC<{}> = () => {
  const i18n = useI18n();
  const currentLocale = i18n.getLocale();

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = languages.find(
      ({ language }) => language === event.target.value
    );

    i18n.setLocale(selectedLocale);
  };

  return (
    <select value={currentLocale.language} onChange={changeLocale}>
      {languages.map(({ language, label }) => (
        <option key={language} value={language}>
          {label}
        </option>
      ))}
    </select>
  );
};
