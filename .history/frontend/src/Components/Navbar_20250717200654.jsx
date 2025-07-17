import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from '../assets/image.png'
import { UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


export default function Navbar() {
  // const [anchorEl, setAnchorEl] = React.useState(null)
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const navigate = useNavigate();


  const handleHomepageNavigation = async ()=>{
    navigate('/')
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt='pec logo' className='h-10 w-10' onClick={handleHomepageNavigation}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block',marginLeft:'9px' } }}
            onClick={handleHomepageNavigation}
          >
            PEC Papers
              <Button>Developers</Button>
          </Typography>
        
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           
            <UserButton/>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            
             <UserButton/>
           
            
          </Box>
        </Toolbar>
      </AppBar>
   
    </Box>
  );
}
