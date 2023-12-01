import { AddCircle } from '@mui/icons-material'
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Config'
import axiosJWT from '../../axiosJWT'

const Status = () => {
    const [data, setData] = useState()
    const [refresh, setrefresh] = useState(0)

    useEffect(() => {
        getStatus()
    }, [refresh])
    
    function getStatus() {
        axios({
            method: 'get',
            url: API_URL + '/api/v1/status'
        })
        .then(({data})=>{
            setData(data)
        })
        .catch((error)=>{
            console.log(error);
            alert('error');
        })
    }
    function deleteStatus(id) {
        axiosJWT({
            method: 'delete',
            url: API_URL + '/api/v1/status/' + id
        })
        .then((data)=>{
            setrefresh(refresh+1)
        })
        .catch((error)=>{
            console.log(error);
            alert('error');
        })
    }
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='h6'>STATUS</Typography>
                <Link to={'/dashboard/add-status'}>
                    <Button disabled variant="contained" color='success' startIcon={<AddCircle />}>
                        Thêm
                    </Button>
                </Link>
            </Stack>
            <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data ?
                                data.map((e, index) => {

                                    return (
                                        <TableRow
                                            key={index+1}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index+1}
                                            </TableCell>
                                            <TableCell align="left">{e.NAME}</TableCell>

                                            <TableCell align="center">
                                                <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                                                    <Link to={"/dashboard/update-status/" + e.STATUS_ID}>
                                                        <Button variant="contained" color='warning'>Sửa</Button>
                                                    </Link>
                                                    <Button 
                                                    disabled
                                                    variant="contained" color='error'
                                                        onClick={() => {
                                                            if (window.confirm('Xóa ' + e.NAME))
                                                                deleteStatus(e.STATUS_ID)
                                                        }}>Xóa</Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                : ''
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Status