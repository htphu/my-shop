import { AddCircle } from '@mui/icons-material'
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Config'
import axiosJWT from '../../axiosJWT'

const ProductVariant = () => {
    const [data, setData] = useState()
    const [option, setOption] = useState()
    const [state, setstate] = useState(0)

    useEffect(() => {
        (async () => {
            try {
                const dataVariant = await getProductVariant()
                setData(dataVariant.data);
                const dataOption =  await getProductOption()
                setOption(dataOption.data);
            } catch (error) {
                console.log(error);
            }
        }) ()
        
    }, [state])

    function getProductVariant() {
        return axios({
                method: 'get',
                url: API_URL + '/api/v1/productVariant'
            })
        
    }
    function getProductOption() {
        return axios({
                method: 'get',
                url: API_URL + '/api/v1/productOption'
            })
    }
    function deleteProductOption(id) {
        return axiosJWT({
            method: 'delete',
            url: API_URL + '/api/v1/productOption/'+id
        })
    }
    function deleteProductVariant(id) {
        return axiosJWT({
            method: 'delete',
            url: API_URL + '/api/v1/productVariant/'+id
        })
    }
    function handleDelete(idOption, idVariant) {
        try {
            if (idOption.length !== 0) {
                idOption.forEach((element)=> deleteProductOption(element))
            }
             deleteProductVariant(idVariant)
             setstate(state+1)
        } catch (error) {
            alert('error')
            console.log(error);
        }
    }

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='h6'>THỂ LOẠI</Typography>
                <Link to={'/dashboard/add-product-variant'}>
                    <Button variant="contained" color='success' startIcon={<AddCircle />}>
                        Thêm
                    </Button>
                </Link>
            </Stack>
            <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Options</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data ?
                                data.map((e, index) => {
                                    const nameOption = [] 
                                    const idOption = []
                                    option?.forEach(element => {
                                        if (element.PRODUCT_VARIANT_ID === e.PRODUCT_VARIANT_ID ){
                                            nameOption.push(element.NAME)
                                            idOption.push(element.PRODUCT_OPTION_ID)
                                        }

                                    });
                                    
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index+1}
                                            </TableCell>
                                            <TableCell align="left">{e.NAME}</TableCell>
                                            <TableCell align="left">
                                                {nameOption.length !== 0 ? nameOption.toString() : ''}
                                            
                                            </TableCell>
                                            <TableCell align="center">
                                                <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                                                    <Link to={"/dashboard/update-product-variant/"+e.PRODUCT_VARIANT_ID}>
                                                        <Button variant="contained" color='warning'>Sửa</Button>
                                                    </Link>
                                                    <Button variant="contained" color='error' 
                                                    onClick={()=>{
                                                        if (window.confirm('Xóa '+ e.NAME))
                                                            handleDelete(idOption,e.PRODUCT_VARIANT_ID)
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

export default ProductVariant