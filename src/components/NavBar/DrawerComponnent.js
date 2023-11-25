import React, { useState } from "react";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router";

const pages = ['יצירת קשר',
    'איזור אישי', 'שאלות ותשובות', 'סוגי מינויים', 'מפת תחנות', 'בית'];

const DrawerComponnent = () => {
    const [OpenDrawer, setOpenD] = useState(false);
    const nav = useNavigate();
    const Pages = (page) => {
        console.log(page)
        if (page == 'בית')
            nav('/Home')
        if (page == 'מפת תחנות')
            nav('/Maps')
        if (page == 'איזור אישי')
            nav('/NavB')
    }
    return (<>

        <React.Fragment>
            <Drawer open={OpenDrawer} onClose={() => setOpenD(false)}>
                <List>

                    {
                        pages.map((page, index) => (
                            <ListItemButton onClick={() => (setOpenD(false), Pages(page))} key={index}><br></br>
                                <ListItemText> {page} </ListItemText>
                            </ListItemButton>
                        ))
                    }
                </List>
            </Drawer>
            <IconButton sx={{ color: 'black', marginLeft: 'auto' }} onClick={() => setOpenD(!OpenDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    </>)
}

export default DrawerComponnent;