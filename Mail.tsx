import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MailContent from "./MailContent";
// import DeletedMail from "./DeletedMail";
// import SentMail from './SentMail';
// import OutMail from './OutMail';

const drawerWidth = 200;

interface Props {
  window?: () => Window;
}

const ResponsiveDrawer: React.FC<Props> = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('Inbox'); // Default selected item
  const [content, setContent] = React.useState('inbox'); // State to manage content display

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (text: string) => {
    setSelectedItem(text);
    setMobileOpen(false); // Close drawer on item click (only for mobile view)

    // Set content based on selected item
    switch (text) {
      case 'Inbox':
        setContent('inbox');
        break;
      case 'Sent item':
        setContent('Sentitem');
        break;
      case 'Deleted Items':
        setContent('deleted');
        break;
      case 'Drafts':
        setContent('Drafts');
        break;
      case 'Junk E-mail':
        setContent('JunkE-mail');
        break;
      case 'Outbox':
        setContent('Outbox');
        break;
      case 'RSS Feeds':
        setContent('RSSFeeds');
        break;
      case 'Search Folders':
        setContent('SearchFolders');
        break;
      // Add more cases for other items as needed
      default:
        setContent('inbox'); // Default to inbox if no specific match
    }
  };

  const drawer = (
    <div
      style={{
        backgroundColor: 'ButtonHighlight', // Background color of the drawer
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Sent item', 'Deleted Items', 'Drafts', 'Junk E-mail', 'Outbox', 'RSS Feeds', 'Search Folders'].map((text) => (
          <ListItem
            button
            key={text}
            onClick={() => handleListItemClick(text)}
            selected={selectedItem === text}
            style={{ padding: '8px 16px' }} // Adjust padding to make items smaller
          >
            <ListItemButton selected={selectedItem === text}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Additional lists if needed */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { xs: drawerWidth }, flexShrink: 0 }}>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#f2eacb', // Background color of the drawer paper
              },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { xs: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
          {content === 'inbox' && (
            <>
              {/* <b>Displaying content for Inbox.</b> */}
              <br /><br />
              <MailContent/>
              {/* <Table/> */}
            </>
          )}
          {content === 'Sentitem' && (
            <>
             {/* <MailContent /> */}
              {/* <b>Displaying content for Sentitem.</b> */}
              {/* <SentMail /> */}
              {/* Add corresponding component for starred content */}
            </>
          )}
          {content === 'deleted' && (
            <>
              {/* <b>Displaying content for Deleted Items.</b> */}
              {/* <DeletedMail /> */}
              {/* Add corresponding component for deleted items content */}
            </>
          )}
          {content === 'Drafts' && (
            <>
              {/* <b>Displaying content for Drafts Items.</b> */}
              {/* <MailContent /> */}
            </>
          )}
          {content === 'JunkE-mail' && (
            <>
              {/* <b>Displaying content for Junk E-mail Items.</b> */}
            </>
          )}
          {content === 'Outbox' && (
            <>
              {/* <b>Displaying content for Outbox Items.</b> */}
              {/* <OutMail /> */}
            </>
          )}
          {content === 'RSSFeeds' && (
            <>
              <b>Displaying content for RSSFeeds Items.</b>
            </>
          )}
          {content === 'SearchFolders' && (
            <>
              <b>Displaying content for SearchFolders Items.</b>
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
