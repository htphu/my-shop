import { Button, Grid, Input, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../Config';
import axiosJWT from '../../axiosJWT';


const UpdateStatus = () => {
    const [name, setName] = useState('');
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getStatus()
    }, [])
    function getStatus() {
        axios({
            method:'get',
            url: API_URL + '/api/v1/status/'+id
        })
        .then(({data})=>{
            setName(data[0].NAME)
        })
        .catch((error)=>{
            console.log(error);
            alert('error')
        })
    }
    function handleSubmit() {
        axiosJWT({
            method:'put',
            url: API_URL + '/api/v1/status/'+id,
            data:{
                NAME: name
            }
        })
        .then(({data})=>{
            navigate('/dashboard/status')
        })
        .catch((error)=>{
            console.log(error);
            alert('error')
        })
    }
    return (
        <div>
            <Grid spacing={1} container direction={'column'}>
                <Grid item>
                    <Typography variant='h6' gutterBottom>Sửa trạng thái</Typography>
                </Grid>
                <Grid item>
                    <Input
                        placeholder="NAME"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Grid>

                <Grid item>
                    <Button variant='contained' color='success' onClick={handleSubmit}>Lưu</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default UpdateStatus