import { useTranslation } from 'react-i18next';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { locales } from '../../constants';

function LocaleSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormControl size="small">
      <Select
        id="locale-select"
        value={i18n.language}
        onChange={handleChange}
        sx={{ height: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
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
