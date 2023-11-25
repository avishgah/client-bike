import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Home from './components/Home/Home';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Stepper from './components/Stepper';
// import logo from './Images/1.jpg';
import './components/AddBike/AddBike.css';
import PersonIcon from '@mui/icons-material/Person';
import { Icon } from '@mui/material';
import Maps from './components/Maps/Maps';

import * as type from "../src/store/actions/actionType";

import Connection from './components/Connection';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import DrawerComponnent from './components/NavBar/DrawerComponnent';


const pages = ['יצירת קשר', 'שאלות ותשובות', 'סוגי מינויים', 'מפת תחנות', 'בית'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const nav = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const theme = useTheme();
    const [value, setValue] = React.useState();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));


    const currentUser = useSelector(state => state.ur.user);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        console.log(page.target.innerText)
        if (page.target.innerText == 'בית')
            nav('/Home')
        if (page.target.innerText == 'מפת תחנות')
            nav('/Maps')

        if (page.target.innerText == 'יצירת קשר')
            nav('/contect')
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (<>



        <AppBar position="static" className='nav'>

            <Container maxWidth="xl">
                <Toolbar disableGutters>


                    {isMatch ? (<>
                        <Typography color='black'>
                            PEDAL
                        </Typography>
                        <DrawerComponnent />

                    </>) : (<>

                        {/* private area */}

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <Button onClick={() => nav('/Connection')} startIcon={<PersonIcon />} className='private-area' sx={{ p: 0 }}>איזור אישי</Button>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
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
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>



                        <Box sx={{ flexGrow: 40, display: { xs: 'flex' } }}>
                            <Menu
                                indicatorColor='secondary'
                                textColor='inherit'
                                className='buttonNav'
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >

                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => (handleCloseNavMenu({ page }))}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>



                        {/* logo */}
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'right',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >

                            <Box
                                component="img"
                                sx={{
                                    height: 45,
                                    display: 'block',
                                    maxWidth: 100,
                                    overflow: 'hidden',
                                    width: '100px',
                                }}
                                // src={logo}
                                src="./Images/1.jpg"
                            />
                        </Typography>
                    </>)}

                </Toolbar>
            </Container>
        </AppBar>
        <br></br><br></br><br></br>
        {console.log(currentUser)}
        {/* <br></br><br></br><br></br>
        <br></br><br></br><br></br> */}
        {/* <Box
            component="img"
            sx={{
                height: 400,
                display: 'block',
                maxWidth: 1500,
                overflow: 'hidden',
                width: '100%',
            }}
            // src={logo}
            src="./Images/כ.jpg"
        /> */}

        <Stepper />

    </>);
}
export default ResponsiveAppBar;
