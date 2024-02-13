// CREDIT: https://mui.com/material-ui/react-drawer/#persistent-drawer

import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CreateMailIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingIcon from '@mui/icons-material/SettingsOutlined';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import StarIcon from '@mui/icons-material/Star';
import './Drawer.css';

const settings = ['Logout'];
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'left',
  padding: theme.spacing(3),
}));

/**
 *
 * @return {object}
 *
 * @param {object} props
 * @param {int} mailLength
 */
export default function PersistentDrawerLeft({
  onViewChange,
  onLogout,
  onMail,
  onMailBox,
}) {
  const countMailFromMailbox = () => {
    const countMap = {}; // Create object
    onMail.forEach((mail) => {
      // loop through mail
      if (countMap[mail.mailbox] === undefined) {
        // Check if mailbox exists
        countMap[mail.mailbox] = 0; // Create key and initalize value counter
      }
      if (mail.viewed === 0) {
        countMap[mail.mailbox] += 1; // Increment value counter for that key
      }
    });
    return countMap;
  };

  const countMailFromFavorite = () => {
    let tally = 0;
    onMail.forEach((mail) => {
      if (mail.favorite === 1) {
        tally += 1;
      }
    });
    return tally;
  };

  const countedMap = countMailFromMailbox();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',

              width: '100%',
            }}
          >
            {/* Hambuger icon */}
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{mr: 2, ...(open && {display: 'none'})}}
            >
              <MenuIcon />
            </IconButton>

            {/* Search bar */}
            <div style={{width: '100%'}}>
              <input
                style={{width: '100%'}}
                type='text'
                placeholder='Search...'
              />
            </div>

            <div style={{display: 'flex'}}>
              {/* Compose View */}
              <IconButton color='#FFFFFF' aria-label='delete'>
                <MailIcon />
              </IconButton>

              {/* Profile Picture can refactor */}
              <Box sx={{flexGrow: 0}}>
                <Tooltip title='Open settings'>
                  <IconButton
                    aria-label='gg'
                    onClick={handleOpenUserMenu}
                    sx={{p: 0}}
                  >
                    <Avatar
                      alt='Remy Sharp'
                      src='/static/images/avatar/2.jpg'
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{mt: '45px'}}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={onLogout}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        // Credit: https://stackoverflow.com/questions/54060096/close-persistent-mui-drawer-on-clicking-outside
        // Click backdrop to close drawer
        variant='temporary'
        // onEscapeKeyDown={handleDrawerClose}
        onBackdropClick={handleDrawerClose}
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '25px',
            }}
          >
            Your Mailboxes
          </div>
        </DrawerHeader>
        <List>
          {['Inbox'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              className={
                text.toLowerCase() === onMailBox ? 'ListItemHighlight' : 'null'
              }
            >
              <ListItemButton
                onClick={onViewChange.bind(this, 'mailbox', text.toLowerCase())}
              >
                {/* <ListItemIcon> */}
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                {/* </ListItemIcon> */}
                <ListItemText primary={text} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'right',
                  }}
                >
                  <ListItemText
                    primary={countedMap[text.toLowerCase()] || ''}
                  />
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={onViewChange.bind(this, 'favorite', 1)}>
            <StarIcon />
            <ListItemText primary={'Favorites'} />
            <div
              style={{
                display: 'flex',
                alignItems: 'right',
              }}
            >
              <ListItemText primary={countMailFromFavorite()} />
            </div>
          </ListItemButton>
          {['Sent', 'Drafts', 'Trash'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              className={
                text.toLowerCase() === onMailBox ? 'ListItemHighlight' : 'null'
              }
            >
              <ListItemButton
                onClick={onViewChange.bind(this, 'mailbox', text.toLowerCase())}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                <ListItemText primary={text} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'right',
                  }}
                >
                  <ListItemText
                    primary={countedMap[text.toLowerCase()] || ''}
                  />
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* Create new mailbox */}
        <List>
          {['New Mailbox'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <CreateMailIcon />
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Settings'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <SettingIcon />
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
