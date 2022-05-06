import { useTranslation } from 'react-i18next';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { locales } from '../../constants';

function LocaleSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value as string);
  };

  return (
    <FormControl size="small">
      <Select id="locale-select" value={i18n.language} onChange={handleChange}>
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
