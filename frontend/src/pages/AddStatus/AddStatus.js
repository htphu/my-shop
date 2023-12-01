import { Button, Grid, Input, Typography } from '@mui/material'
import React, { useState } from 'react'
import { API_URL } from '../../Config'
import axiosJWT from '../../axiosJWT'

const AddStatus = () => {
    const [name, setName] = useState('');

    function handleSubmit() {
        if (!name.trim())
            return;
        addStatus()
    }
    function addStatus() {
        axiosJWT({
            method: 'post',
            url: API_URL + '/api/v1/status',
            data:{
                NAME: name
            }
        })
        .then(({data})=>{
            alert(data);
            setName('')
        })
        .catch((error)=>{
            console.log(error);
            alert('error');
        })
    }
    return (
        <div>
            <Grid spacing={1} container direction={'column'}>
                <Grid item>
                    <Typography variant='h6' gutterBottom>Thêm trạng thái</Typography>
                </Grid>
                <Grid item>
                    <Input
                        placeholder="NAME"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Grid>
                
                <Grid item>
                    <Button variant='contained' color='success' onClick={handleSubmit}>Thêm</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddStatus