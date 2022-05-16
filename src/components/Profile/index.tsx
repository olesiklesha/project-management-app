import { Avatar, Box, IconButton, Link, Typography } from '@mui/material';
import { ITeammateInfo } from '../../models/models';
import GhIcon from '../GhIcon';

interface IProfileProps extends ITeammateInfo {
  index: number;
}

function Profile({ avatar, name, description, gh, index }: IProfileProps) {
  return (
    <Box sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {index % 2 === 0 ? <Avatar src={avatar} alt="" sx={{ width: 100, height: 100 }} /> : ''}
        <Box sx={{ ml: 2, width: '70%' }}>
          <Typography component="h3" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {name}
            <IconButton sx={{ mt: -0.5 }} component={Link} href={gh} target="_blank">
              <GhIcon fontSize="small" />
            </IconButton>
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

export default Profile;
