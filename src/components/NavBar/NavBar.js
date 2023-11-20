import './NavBar.scss';
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import { AppBar, Tabs, Tab, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import Drawer from './DrawerComponnent';
import DrawerComponnent from './DrawerComponnent';
import DrawerComp from './DrawerComp';

const NavBar = () => {
    const [value, setValue] = useState();
    const theme = useTheme();
    console.log(theme)
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    console.log(isMatch)

    const nav = useNavigate();
    const pages = ['יצירת קשר', 'שאלות ותשובות', 'סוגי מינויים', 'מפת תחנות', 'בית'];


    const handleCloseNavMenu = (page) => {
        console.log(page.page)
        if (page.page == 'בית')
            nav('/Home')
        if (page.page == 'מפת תחנות')
            nav('/Maps')
        // setAnchorElNav(null);
    };

    return (<>
        <React.Fragment>
            <AppBar sx={{ background: "" }}>
                <Toolbar>
                    {isMatch ? (<>
                        <Typography>
                            PEDAL
                        </Typography>
                        <DrawerComponnent />

                    </>) : (<>

                        <Tabs sx={{marginLeft:'auto'}} textColor='inherit' value={value} onChange={(e, value) => setValue(value)} indicatorColor='secondary'>

                            {pages.map((page,index) => (
                                <Tab key={page} label={page} onClick={() => (handleCloseNavMenu({ page }))}/>
                                
                            ))}
{/* 

                            {pages.map((page,index)=>(
                                <Tab key={index} label={page}/>
                            ))} */}
                        </Tabs>

                    </>)
                    }




                </Toolbar>
            </AppBar>

        </React.Fragment>

    </>)
}

export default NavBar;
