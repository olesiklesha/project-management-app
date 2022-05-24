import React, { useState } from 'react';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import {
  Person,
  KeyboardArrowDown,
  ModeEdit,
  Logout,
  AddCircleOutlineRounded,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import LocaleSwitcher from '../LocaleSwitcher';
import { BoardCreator } from '..';
import { logOut } from '../../utils';

function UserMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openAuthMenu, setOpenAuthMenu] = React.useState<boolean>(false);
  const anchorAuthRef = React.useRef<HTMLButtonElement>(null);
  const { login } = useAppSelector((state) => state.authSlice);
  const [isOpened, setOpened] = useState(false);

  const handleLogout = () => {
    logOut();
    setOpenAuthMenu(false);
    navigate(AppRoutes.WELCOME);
  };

  const toggleIsOpened = () => {
    setOpened((prev) => !prev);
  };

  const handleCreateBtnClick = () => {
    setOpenAuthMenu(false);
    toggleIsOpened();
  };

  const handleToggleAuthMenu = () => {
    setOpenAuthMenu((prevOpen) => !prevOpen);
  };

  const handleCloseAuthMenu = () => {
    setOpenAuthMenu(false);
  };
  return (
    <>
      <Button
        ref={anchorAuthRef}
        id="composition-button"
        startIcon={<Person color="secondary" />}
        color="inherit"
        sx={{ fontWeight: 'bold', textTransform: 'none' }}
        onClick={handleToggleAuthMenu}
        endIcon={
          <KeyboardArrowDown
            color="secondary"
            sx={{
              transform: `rotate(${openAuthMenu ? '180' : '0'}deg)`,
              transition: '0.5s',
            }}
          />
        }
      >
        {login}
      </Button>
      <Popper
        open={openAuthMenu}
        anchorEl={anchorAuthRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        style={{ zIndex: '1110' }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            in={TransitionProps?.in}
            onEnter={TransitionProps?.onEnter}
            onExited={TransitionProps?.onExited}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseAuthMenu}>
                <MenuList
                  autoFocusItem={openAuthMenu}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center' }}>
                    <LocaleSwitcher />
                  </MenuItem>
                  <MenuItem
                    onClick={handleCreateBtnClick}
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                  >
                    <Button
                      sx={{ textTransform: 'none', color: 'inherit' }}
                      startIcon={<AddCircleOutlineRounded color="success" />}
                    >
                      {t('pages.mainPage.createBtn')}
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseAuthMenu}>
                    <Button
                      startIcon={<ModeEdit color="success" />}
                      component={RouterLink}
                      to={AppRoutes.EDIT}
                      sx={{ textTransform: 'none', color: 'inherit' }}
                    >
                      {t('components.header.editProfile')}
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Button
                      startIcon={<Logout color="error" />}
                      sx={{ textTransform: 'none', color: 'inherit' }}
                    >
                      {t('components.header.logOut')}
                    </Button>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <BoardCreator isOpened={isOpened} onCancel={toggleIsOpened} />
    </>
  );
}

export default UserMenu;
