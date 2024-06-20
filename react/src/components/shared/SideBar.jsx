import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {sidebarLinksTop, sidebarLinksBottom} from "../../constants/sidebarLinks";
import {Link, useLocation} from "react-router-dom";
import {Main} from "../../layout/Main";
import {AccountCircle} from "@mui/icons-material";

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
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SideBar({outlet}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {pathname} = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" className="w-full">
                        {open ? "" : "MDEICA"}
                    </Typography>
                    <div className="flex w-full justify-end">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
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
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Typography variant="h6" className="w-full">{open ? "MEDICA" : ""}</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {sidebarLinksTop.map((link, index) => {
                        const isActive = (pathname.includes(link.path)
                            && link.path.length > 1) || pathname === link.path;
                        return (
                            <ListItem key={index} disablePadding
                                      className={`${isActive && 'text-white bg-[#1976d2]'}`}
                                      sx={{display: 'block'}}>
                                <Link to={link.path}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <div
                                                className={`${isActive && 'text-white bg-[#1976d2]'}`}
                                            >
                                                {link.icon}
                                            </div>
                                        </ListItemIcon>
                                        <ListItemText primary={link.name} sx={{opacity: open ? 1 : 0}}/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                    })}
                </List>
                <Divider/>
                <List>
                    {sidebarLinksBottom.map((link, index) => {
                        const isActive = (pathname.includes(link.path)
                            && link.path.length > 1) || pathname === link.path;
                        return (
                            <ListItem key={index} disablePadding
                                      className={`${isActive && 'text-white bg-[#1976d2]'}`}
                                      sx={{display: 'block'}}>
                                <Link to={link.path}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <div
                                                className={`${isActive && 'text-white bg-[#1976d2]'}`}
                                            >
                                                {link.icon}
                                            </div>
                                        </ListItemIcon>
                                        <ListItemText primary={link.name} sx={{opacity: open ? 1 : 0}}/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
            <Main className="w-[80%]" open={open}>
                <DrawerHeader/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {outlet}
                    </Grid>
                </Grid>

            </Main>
        </Box>
    );
}

