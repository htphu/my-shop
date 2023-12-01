import { Button, Checkbox, Grid, Input, InputLabel, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../Config'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axiosJWT from '../../axiosJWT'

const UpdateUser = () => {
    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getUser()
    }, [])

    function getUser() {
        axiosJWT({
            method: 'get',
            url: API_URL + "/api/v1/user/" + id
        })
            .then(({ data }) => {
                setUserName(data.USER_NAME)
                setName(data.NAME)
                setPhone(data.PHONE)
                setAddress(data.ADDRESS)
                setIsAdmin(!!data.IS_ADMIN)
            })
            .catch((error) => {
                console.log(error);
                alert("ERROR")
            })
    }
    function handleSubmit() {
        if (!userName || !name || !phone || !address) {
            alert('Vui lòng nhập đầy đủ thông tin!')
            return
        }
        const data = {
            USER_NAME: userName,
            NAME: name,
            PHONE: phone,
            ADDRESS: address,
            IS_ADMIN: isAdmin
        }
        axiosJWT({
            method: 'put',
            url: API_URL + '/api/v1/user/' + id,
            data: data
        })
            .then(() => {
                alert('Update người dùng thành công')
                navigate('/dashboard/user')
            })
            .catch((error) => {
                console.log(error);
                alert('ERROR: ');
            })
    }
    return (
        <div>
            <Grid spacing={1} container direction={'column'}>
                <Grid item>
                    <Typography variant='h6' gutterBottom>Update người dùng</Typography>
                </Grid>
                <Grid item>
                    <InputLabel id="demo-simple-select-label">User Name</InputLabel>
                    <Input type='text' value={userName} onChange={e => setUserName(e.target.value)} />
                </Grid>
                <Grid item>
                    <InputLabel id="demo-simple-select-label">Họ Tên</InputLabel>
                    <Input type='text' value={name} onChange={e => setName(e.target.value)} />
                </Grid>
                <Grid item>
                    <InputLabel id="demo-simple-select-label">SĐT</InputLabel>
                    <Input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                </Grid>
                <Grid item>
                    <InputLabel id="demo-simple-select-label">Địa chỉ</InputLabel>
                    <Input type='text' value={address} onChange={e => setAddress(e.target.value)} />
                </Grid>
                <Grid item>
                    <InputLabel id="demo-simple-select-label">ADMIN</InputLabel>
                    <Checkbox value={isAdmin} checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                </Grid>
                <Grid item>
                    <Button variant='contained' color='success' onClick={handleSubmit}>Lưu</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default UpdateUser