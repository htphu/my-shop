import React, { useEffect, useState } from 'react'
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.scss'
import { AccountCircle } from '@mui/icons-material';
import { API_URL } from '../../Config';
import axiosJWT from '../../axiosJWT';

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const open = Boolean(anchorEl);
    useEffect(() => {
        setUserName(localStorage.getItem('USER_NAME'))
        setIsAdmin(localStorage.getItem('IS_ADMIN'))
    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogOut() {
        axiosJWT({
            method: 'post',
            url: API_URL + '/api/v1/logout',
        })
            .then(() => {
                localStorage.clear()
                handleClose()
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                alert('ERROR')
            })
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to={"/"}>
                            My Shop
                        </Link>
                    </Typography>
                    {
                        userName
                            ?
                            <>
                                <Typography>
                                    {userName}
                                </Typography>
                                <IconButton
                                    aria-label="cart"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <AccountCircle sx={{ color: '#fff' }} />
                                </IconButton>
                            </>
                            :
                            <Link to={'login'}>
                                <Button color="inherit" >Login</Button>
                            </Link>
                    }

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            Boolean(isAdmin) ?
                                <MenuItem >
                                    <Link to={'dashboard'}>
                                        DashBoard
                                    </Link>
                                </MenuItem>
                                : ''
                        }

                        <MenuItem >
                            <Link to={'history-order'}>
                                Lịch sử mua hàng
                            </Link>
                        </MenuItem>
                        <MenuItem >
                            <Link to={'info'}>
                                Thông tin tài khoản
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>Đăng xuất</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar