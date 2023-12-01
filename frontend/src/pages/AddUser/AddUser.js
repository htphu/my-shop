import { Button, Checkbox, Grid, Input, InputLabel, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../Config'
import { useNavigate } from 'react-router-dom'
import axiosJWT from '../../axiosJWT'

const AddUser = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()

    function handleSubmit() {
        if (!userName || !password || !name || !phone || !address) {
            alert('Vui lòng nhập đầy đủ thông tin!')
            return
        }
        const data = {
            USER_NAME: userName,
            PASSWORD: password,
            NAME: name,
            PHONE: phone,
            ADDRESS: address,
            IS_ADMIN: isAdmin
        }
        axiosJWT({
            method: 'post',
            url: API_URL + '/api/v1/user',
            data: data
        })
        .then(()=>{
            alert('Tạo người dùng thành công')
            navigate('/dashboard/user')
        })
        .catch(({response})=>{
            console.log(response);
            alert('ERROR: '+response.data);
        })
    }
    
    return (
        <div>
            <div>
                <Grid spacing={1} container direction={'column'}>
                    <Grid item>
                        <Typography variant='h6' gutterBottom>Thêm người dùng</Typography>
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">User Name</InputLabel>
                        <Input type='text' value={userName} onChange={e=>setUserName(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">Password</InputLabel>
                        <Input type='text' value={password} onChange={e=>setPassword(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">Họ Tên</InputLabel>
                        <Input type='text' value={name} onChange={e=>setName(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">SĐT</InputLabel>
                        <Input type='text' value={phone} onChange={e=>setPhone(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">Địa chỉ</InputLabel>
                        <Input type='text' value={address} onChange={e=>setAddress(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">ADMIN</InputLabel>
                        <Checkbox value={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}/>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='success' onClick={handleSubmit}>Thêm</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default AddUser