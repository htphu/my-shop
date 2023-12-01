import { Button, Container, Grid, Input, InputLabel, Paper, Typography } from '@mui/material'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { API_URL } from '../../Config';
import axios from 'axios';

const Register = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate()
    function handleSubmit() {
        if (!userName || !password || !name || !phone || !address) {
            alert('Vui lòng nhập đầy đủ thông tin!')
            return
        }
        if (password !== confirmPassword) {
            alert('Mật khẩu và nhập lại mật khẩu không đúng!')
            return
        }
        const data = {
            USER_NAME: userName,
            PASSWORD: password,
            NAME: name,
            PHONE: phone,
            ADDRESS: address,
            IS_ADMIN: false
        }
        axios({
            method: 'post',
            url: API_URL + '/api/v1/register',
            data: data
        })
            .then(() => {
                alert('Tạo người dùng thành công')
                navigate('/login')
            })
            .catch(({ response }) => {
                console.log(response);
                alert('ERROR: ' + response.data);
            })
    }
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100%', padding: '80px 0', display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={0} sx={{ width: '500px', padding: '40px' }}>
                <Grid spacing={1} xs={12} container direction={'column'}>
                    <Grid item>
                        <Typography align='center' variant='h6' gutterBottom>ĐĂNG KÝ</Typography>
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">User Name</InputLabel>
                        <Input fullWidth type='text' value={userName} onChange={e => setUserName(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">Password</InputLabel>
                        <Input fullWidth type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">Nhập Lại Password</InputLabel>
                        <Input fullWidth type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">Họ Tên</InputLabel>
                        <Input fullWidth type='text' value={name} onChange={e => setName(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">SĐT</InputLabel>
                        <Input fullWidth type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">Địa chỉ</InputLabel>
                        <Input fullWidth type='text' value={address} onChange={e => setAddress(e.target.value)} />
                    </Grid>
                    <Grid item container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Button
                            onClick={handleSubmit}
                            variant='contained'
                            color='success'
                            size='large'
                            sx={{ padding: '8px 16px' }}
                        >Submit</Button>
                        <Link to={'/login'}>Đăng nhập</Link>
                    </Grid>

                </Grid>
            </Paper>
        </Container>
    )
}

export default Register