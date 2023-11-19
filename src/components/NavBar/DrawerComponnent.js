import React, { useState } from "react";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['יצירת קשר'
    , 'שאלות ותשובות', 'סוגי מינויים', 'מפת תחנות', 'בית'];

const DrawerComponnent = () => {
    const [OpenDrawer, setOpenD] = useState(false);
    return (<>

        <React.Fragment>
            <Drawer open={OpenDrawer} onClose={() => setOpenD(false)}>
                <List>

                    {
                        pages.map((page, index) => (
                            <ListItemButton onClick={()=>setOpenD(false)} key={index}>
                                    <ListItemText> {page} </ListItemText>
                            </ListItemButton>
                        ))
                    }
{/* 
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>
                                Login
                            </ListItemText>
                        </ListItemIcon>
                    </ListItemButton><br></br>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>
                                Login
                            </ListItemText>
                        </ListItemIcon>
                    </ListItemButton> */}
                </List>
            </Drawer>
            <IconButton sx={{ color: 'white', marginLeft: 'auto' }} onClick={() => setOpenD(!OpenDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    </>)
}

export default DrawerComponnent;