
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LoginIcon from '@mui/icons-material/Login';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { auth, signOut } from "../firebase/index"
import PersonIcon from '@mui/icons-material/Person';
import Profile from './Profile';
import { useState } from 'react';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { doc, getDoc, db, collection, getDocs } from "../firebase/index"
import Footer from '../components/footer';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function Profilee() {
    const navigate = useNavigate()
    const [dataA, setDataA] = useState()
    let userID = localStorage.getItem("userID")
    console.log(userID)

    React.useEffect(() => {
        const foo = async () => {
            const docRef = doc(db, "users", userID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
               setDataA(docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

        }
        foo()

    }, [])
    const [location, setLocation] = useState("")
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const logout = () => {
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            // An error happened.
        });

    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <NavLink to={"/home"}>
                        <Typography variant="h6" noWrap component="div">
                            Online Learning Plateform
                        </Typography>
                    </NavLink>
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>


                    <NavLink to={"/profile"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Profile"} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <NavLink to={"/home"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <NavLink to={"/enroll"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SubscriptionsIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Enroll Now"} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>


                </List>
                <Divider />
                <List>
                   
                    <ListItem disablePadding>
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Log Out"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {dataA && <div className="bg-gray-100 min-h-screen p-6">
                    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
                        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                       
                        <div className="mb-4">
                            <label className="text-gray-600">Name</label>
                            <p className="text-gray-800 font-semibold">{dataA.name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-600">Email</label>
                            <p className="text-gray-800">{dataA.email}</p>
                        </div>

                        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Edit Profile
                        </button> */}
                    </div>
                </div>}
            </Main>
           
        </Box>
    );
}

export default Profilee
