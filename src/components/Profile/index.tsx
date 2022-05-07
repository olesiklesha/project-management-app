import { Avatar, Box, Typography } from '@mui/material';
import { ITEAM_INFO } from '../../constants';

interface IProfileProps extends ITEAM_INFO {
  index: number;
}

export default function Profile({ avatar, name, description, index }: IProfileProps) {
  return (
    <Box sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {index % 2 === 0 ? <Avatar src={avatar} alt="" sx={{ width: 100, height: 100 }} /> : ''}
        <Box sx={{ ml: 2, width: '70%' }}>
          <Typography component="h3" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1.25rem' }}>
            {description}
          </Typography>
        </Box>
        {index % 2 === 1 ? <Avatar src={avatar} alt="" sx={{ width: 100, height: 100 }} /> : ''}
      </Box>
    </Box>
  );
}
