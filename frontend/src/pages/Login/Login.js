import { Button, Container, Input, InputAdornment, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Lock } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../Config'
import axiosJWT from '../../axiosJWT';

const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    function handleSubmit() {
        axiosJWT({
            method: 'post',
            url: API_URL + '/api/v1/login',
            data: {
                USER_NAME: userName,
                PASSWORD: password
            }
        })
            .then(({ data }) => {
                localStorage.setItem("USER_NAME", data.USER_NAME)
                localStorage.setItem("USER_ID", data.USER_ID)
                localStorage.setItem("IS_ADMIN", data.IS_ADMIN)
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                alert('ERROR: ' + err.response.data)
            })
    }
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100%', padding: '80px 0', display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={0} sx={{ width: '600px', padding: '40px' }}>
                <Stack spacing={2}>
                    <Typography variant='h6' textAlign={'center'} gutterBottom>ĐĂNG NHẬP</Typography>
                    <Input
                        placeholder="User name"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        }
                    />
                    <Input
                        placeholder="Password"
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        }
                    />
                    <Link to={'/register'}>Đăng ký</Link>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        color='success'
                        sx={{padding:'12px 16px'}}
                    >Submit</Button>
                </Stack>
            </Paper>
        </Container>
    )
}

export default Login