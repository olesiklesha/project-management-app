import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const locales = [
  { name: 'en-EN', nativeName: 'English' },
  { name: 'ru-RU', nativeName: 'Русский' },
];

function LocaleSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value as string);
  };

  return (
    <FormControl>
      <InputLabel id="locale-select-label">Language</InputLabel>
      <Select
        labelId="locale-select-label"
        id="locale-select"
        value={i18n.language}
        label="Language"
        onChange={handleChange}
      >
        {locales.map((lng) => (
          <MenuItem key={lng.name} value={lng.name}>
            {lng.nativeName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LocaleSelector;
