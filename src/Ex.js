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
import { useDispatch, useSelector } from 'react-redux';

import { Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import DrawerComponnent from './components/NavBar/DrawerComponnent';


const pages = ['סטטיסטיקה ', 'יצירת קשר', 'שאלות ותשובות', 'סרטון הדרכה', 'מפת תחנות', 'בית'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const nav = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const theme = useTheme();
    const [value, setValue] = React.useState();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));


    const currentUser = useSelector(state => state.ur.user);


    const handleCloseNavMenu = (page) => {
        console.log(page.target.innerText)
        if (page.target.innerText == 'בית')
            nav('/Home')
        if (page.target.innerText == 'מפת תחנות')
            nav('/Maps')

        if (page.target.innerText == 'יצירת קשר')
            nav('/contect')
        if (page.target.innerText == 'שאלות ותשובות')
            nav('/Question')
        if (page.target.innerText == 'סרטון הדרכה')
            nav('/Video')
        if (page.target.innerText == 'סטטיסטיקה')
            nav('/statistic')
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const dispatch = useDispatch();
    const handeleClickPrivate = () => {
        dispatch({ type: type.LOG_OUT });
        nav('/Connection')
    }
    const handeleClickAdd = () => {
        dispatch({ type: type.LOG_OUT });
        nav('/yup')
    }
    return (<>


        {/* position="static" */}
        <AppBar className='nav'>
            <h1 style={{ textAlign: 'center', fontSize: "30px" }}>PEDAL</h1>

            <Container maxWidth="">
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
                                <Button onClick={() => handeleClickPrivate()} startIcon={<PersonIcon />} className='private-area' sx={{ p: 0 }}>איזור אישי</Button>
                                <Button onClick={() => handeleClickAdd()} startIcon={<PersonIcon color='orange' />} className='private-area2' sx={{ p: 0, marginLeft: '10px' }}>הצטרפות</Button>
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

                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
                                    height: 80,
                                    display: 'block',
                                    // maxWidth: 100,
                                    overflow: 'hidden',
                                    width: '150px',
                                }}
                                // src={logo}
                                src='/logo2.png'
                            />
                        </Typography>

                    </>)}

                </Toolbar>
            </Container>
        </AppBar>


        {console.log(currentUser)}
        <br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br>



    </>);
}
export default ResponsiveAppBar;
