import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WifiIcon from '@mui/icons-material/Wifi';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from '@mui/material';
function Sidebar() {
  return (
    <div style={{ width: '250px', position: 'fixed', top: '64px', bottom: '0', left: '0' }}>
      <Box p={2} display="flex" alignItems="center">
        <Avatar alt="Profile Picture" src="/path_to_profile_picture.jpg" />
        <Box ml={2}>
          <Typography variant="subtitle1">Username</Typography>
          <Typography variant="body2">364 / 500 tokens</Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><FormatListBulletedOutlinedIcon/></ListItemIcon>
          <ListItemText primary="Accounts" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Inventory2OutlinedIcon/></ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><WifiIcon /></ListItemIcon>
          <ListItemText primary="Proxies" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><FilterNoneOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Referal" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="GPT 4 - Setup" />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;