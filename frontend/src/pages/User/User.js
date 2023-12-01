import React, { useEffect, useState } from 'react'
import { AddCircle, CheckCircle, HighlightOffOutlined } from '@mui/icons-material'
import { Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Config'
import axiosJWT from '../../axiosJWT'

const User = () => {
    const [users, setUsers] = useState([])
    const [Refresh, setRefresh] = useState(0)
    useEffect(() => {
        getAllUser()
    }, [Refresh])

    function getAllUser() {
        axiosJWT({
            method: 'get',
            url: API_URL + "/api/v1/user"
        })
            .then(({ data }) => {
                setUsers(data)
            })
            .catch((error) => {
                console.log(error);
                alert("ERROR")
            })
    }
    function handleDelete(id) {
        axiosJWT({
            method: 'delete',
            url: API_URL + "/api/v1/user/" + id
        })
            .then(() => {
                setRefresh(Refresh + 1)
            })
            .catch((error) => {
                console.log(error);
                alert("ERROR")
            })
    }
    function handleDeleteRefreshToken(userID) {
        if (window.confirm("Xóa Refresh Token?")) {
            axiosJWT({
                method: 'delete',
                url: API_URL + "/api/v1/refreshToken/" + userID
            })
                .then(() => {
                    setRefresh(Refresh + 1)
                })
                .catch((error) => {
                    console.log(error);
                    alert("ERROR")
                })
        }
    }
    return (
        <div>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='h6'>Người dùng</Typography>
                <Link to={"/dashboard/add-user"}>
                    <Button variant="contained" color='success' startIcon={<AddCircle />}>
                        Thêm
                    </Button>
                </Link>
            </Stack>
            <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">STT</TableCell>
                            <TableCell align="left">User Name</TableCell>
                            <TableCell align="left">Họ Tên</TableCell>
                            <TableCell align="right">SĐT</TableCell>
                            <TableCell align="right">Địa Chỉ</TableCell>
                            <TableCell align="center">ADMIN</TableCell>
                            <TableCell align="center">Xóa Refresh Token</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((element, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">{index + 1}</TableCell>
                                        <TableCell align="left">{element.USER_NAME}</TableCell>
                                        <TableCell align="left">{element.NAME}</TableCell>
                                        <TableCell align="right">{element.PHONE}</TableCell>
                                        <TableCell align="right">{element.ADDRESS}</TableCell>
                                        <TableCell align="center">{element.IS_ADMIN ? <CheckCircle color='success' /> : ''}</TableCell>
                                        <TableCell align="center">
                                            {
                                                element.REFRESH_TOKEN ?
                                                    <IconButton aria-label="delete" color="error" onClick={() => { handleDeleteRefreshToken(element.USER_ID) }}>
                                                        <HighlightOffOutlined />
                                                    </IconButton>
                                                    : ''
                                            }

                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                                                <Link to={"/dashboard/update-user/" + element.USER_ID}>
                                                    <Button variant="contained" color='warning'>Sửa</Button>
                                                </Link>
                                                <Button variant="contained" color='error'
                                                    onClick={() => {
                                                        if (window.confirm('Xóa người dùng STT ' + (index + 1)))
                                                            handleDelete(element.USER_ID)
                                                    }}>Xóa</Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default User