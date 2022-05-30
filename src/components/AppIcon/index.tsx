import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { ReactComponent as Logo } from './ice-cream.svg';

function AppIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <Logo />
    </SvgIcon>
  );
}

export default AppIcon;
