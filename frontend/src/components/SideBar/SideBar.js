import React from 'react'
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
import { Button } from '@mui/material';
import { AccountBox, BusinessCenter, ShoppingBag } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';


const SideBar = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    function handleLogOut() {
        localStorage.clear()
        navigate('/')
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} >
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
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        MY SHOP
                    </Typography>
                    <Button color="inherit" href='/'>Trang chủ</Button>
                    <Button color="inherit" onClick={handleLogOut}>Đăng xuất</Button>
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
                <DrawerHeader sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem key={'product'} disablePadding>
                        <ListItemButton onClick={() => { navigate('/dashboard/product') }}>
                            <ListItemIcon>
                                <BusinessCenter />
                            </ListItemIcon>
                            <ListItemText primary={'Sản phẩm'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'product_variant'} disablePadding>
                        <ListItemButton onClick={() => { navigate('/dashboard/product-variant') }}>
                            <ListItemIcon>
                                <BusinessCenter />
                            </ListItemIcon>
                            <ListItemText primary={'Thể loại'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'user'} disablePadding>
                        <ListItemButton onClick={() => { navigate('/dashboard/user') }}>
                            <ListItemIcon>
                                <AccountBox />
                            </ListItemIcon>
                            <ListItemText primary={'Người dùng'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'status'} disablePadding>
                        <ListItemButton onClick={() => { navigate('/dashboard/status') }}>
                            <ListItemIcon>
                                <AccountBox />
                            </ListItemIcon>
                            <ListItemText primary={'Trạng thái sản phẩm'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'status'} disablePadding>
                        <ListItemButton onClick={() => { navigate('/dashboard/order') }}>
                            <ListItemIcon>
                                <ShoppingBag />
                            </ListItemIcon>
                            <ListItemText primary={'Đặt hàng'} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />

            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    );
}
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

export default SideBar