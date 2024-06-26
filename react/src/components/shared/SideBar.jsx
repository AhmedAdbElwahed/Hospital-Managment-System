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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {sidebarLinksTop, sidebarLinksBottom} from "../../constants/sidebarLinks";
import {Link, useLocation} from "react-router-dom";
import {Main} from "../../layout/Main";
import {logoutUser} from "../../redux/features/auth/authActions";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {stringAvatar} from "../../util/additionalFunc";

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
    const [user, setUser] = React.useState({});
    const dispatch = useDispatch();
    const {userTokens, error} = useSelector((state) => state.auth);
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

    const handleLogout = () => {
        dispatch(logoutUser({
            accessToken: userTokens.access_token
        }));
        if (error) {
            setOpen(true);
        }
    }

    useEffect(() => {
        const jwt = jwtDecode(userTokens.access_token);
        const userData = {
            username: jwt.username,
            role: jwt.role.split("_")[1].toLowerCase()
        }
        console.log("userdata: ", userData)
        setUser(userData);
    }, []);

    return (
        <Box sx={{display: 'flex'}} className="h-screen">
            <CssBaseline/>
            <AppBar
                className="bg-white/30"
                position="fixed"
                open={open}
                sx={
                    {
                        backgroundColor: "rgba(255, 255, 255, 0.60)",
                        "backdropFilter": "blur(4px)",
                        color: "black",
                        boxShadow: "0px 0px 0px 0px",
                    }
                }
            >
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
                    {
                        !open && (
                            <img
                                className="w-[150px]"
                                src="/assets/medicaAsset%202.svg"
                                alt="Medica"
                            />
                        )
                    }
                    <div className="flex w-full justify-end">
                        <div>
                            <Avatar
                                {...stringAvatar(`${user ? user.username : 'N A'} `)}
                            />
                        </div>
                        <div className="flex flex-col ml-2 max-xs:hidden">
                            <span className="text-sm font-bold">{user.username ? user.username : "Anonymous"}</span>
                            <span className="text-sm">{user.role ? user.role : "Anonymous"}</span>
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

                PaperProps={{
                    sx: {
                        backgroundColor: "#323584",
                        borderRightColor: "#f4f4f4",
                        color: "white"
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    {/*<Typography variant="h6" className="w-full">{open ? "MEDICA" : ""}</Typography>*/}
                    {
                        open && (
                            <div className="flex justify-items-center w-full">
                                <img
                                    className="w-[150px]"
                                    src="/assets/medica-whiteAsset%203.svg"
                                    alt="Medica"
                                />
                            </div>
                        )
                    }
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{
                    backgroundColor: "#f4f4f4"
                }}/>
                <List>
                    {sidebarLinksTop.map((link, index) => {
                        const isActive = (pathname.includes(link.path)
                            && link.path.length > 1) || pathname === link.path;
                        return (
                            <ListItem key={index} disablePadding
                                      className={`${isActive && 'bg-[#f4f4f4] text-black'}`}
                                      sx={
                                          {
                                              display: 'block',
                                              borderRadius: "40px 0 0 40px",
                                              marginLeft: "10px",
                                              width: 229
                                          }
                                      }>
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
                                                className={`${isActive ? 'text-[#323584]' : "text-white "}`}
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
                                      className={`${isActive && 'bg-[#f4f4f4] text-black'}`}
                                      sx={
                                          {
                                              display: 'block',
                                              borderRadius: "40px 0 0 40px",
                                              marginLeft: "10px",
                                              width: 229
                                          }
                                      }>
                                <Link to={link.path} onClick={link.name === "Logout" && handleLogout}>
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
                                                className={`${isActive ? 'text-[#323584]' : "text-white "}`}
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
            <Main className="w-[80%] h-full bg-[#f4f4f4]" open={open}>
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

