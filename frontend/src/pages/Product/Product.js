import React, { useEffect, useState } from 'react'
import { AddCircle } from '@mui/icons-material'
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Config'
import CurrencyFormat from 'react-currency-format';
import axiosJWT from '../../axiosJWT'

const Product = () => {
    const [products, setProducts] = useState([])
    const [productVariants, setProductVariants] = useState([])
    const [productOptions, setProductOptions] = useState([])
    const [images, setImages] = useState([])
    const [dataSKU, setDataSKU] = useState([])

    const [refresh, setRefresh] = useState(1)
    useEffect(() => {
        (async () => {
            try {
                const [dataVariant, dataOption, dataImage, dataSKU] = await Promise.all([
                    getProductVariants(),
                    getProductOptions(),
                    getImages(),
                    getSKU()
                ])

                setProductVariants(dataVariant.data)
                setProductOptions(dataOption.data)
                setImages(dataImage.data)
                setDataSKU(dataSKU.data)

                const dataProduct = await getProducts()
                setProducts(dataProduct.data)
            } catch (error) {
                console.log(error);
                alert('ERROR')
            }
        })()

    }, [refresh])

    function getProducts() {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/product'
        })
    }
    function getProductVariants() {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/productVariant'
        })
    }
    function getProductOptions() {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/productOption'
        })
    }
    function getImages() {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/image'
        })
    }
    function getSKU() {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/sku'
        })
    }
    async function handleDelete(productID, imageID, imagePATH, skuID) {
        try {
            const imageNAME = imagePATH.replace("/public/uploads/","")
            deleteImage(imageID, imageNAME) 

            await skuID.forEach(element => {
                deleteSKU(element.SKU_ID)
            }) 
            await deleteProduct(productID)
            setRefresh(refresh+1)
        } catch (error) {
            console.log(error);
            alert('ERROR')
        }
    }
    function deleteProduct(id) {
        return axiosJWT({
            method: 'delete',
            url: API_URL + '/api/v1/product/'+id
        })
    }
    function deleteImage(id,name) {
        return axiosJWT({
            method: 'delete',
            url: API_URL + '/api/v1/image/'+id+"?name="+name
        })
    }
    function deleteSKU(id) {
        return axiosJWT({
            method: 'delete',
            url: API_URL + '/api/v1/sku/'+id
        })
    }
    return (
        <div>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='h6'>Sản Phẩm</Typography>
                <Link to={'/dashboard/add-product'}>
                    <Button variant="contained" color='success' startIcon={<AddCircle />}>
                        Thêm
                    </Button>
                </Link>
            </Stack>
            <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="left">Tên sản phẩm</TableCell>
                            <TableCell align="left">Thể loại</TableCell>
                            <TableCell align="center">Hình ảnh</TableCell>
                            <TableCell align="left">Chi tiết</TableCell>
                            <TableCell align="right">Option - Giá tiền</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products?.map((e, i) => {
                                const variant = productVariants.find((element) => element.PRODUCT_VARIANT_ID === e.PRODUCT_VARIANT_ID)
                                const image = images.find((element) => element.PRODUCT_ID === e.PRODUCT_ID)
                                const option = productOptions.filter((element) => element.PRODUCT_VARIANT_ID === variant.PRODUCT_VARIANT_ID)
                                const sku = dataSKU.filter((element) => element.PRODUCT_ID === e.PRODUCT_ID)
                                return (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {i+1}
                                        </TableCell>
                                        <TableCell align="left">{e.NAME}</TableCell>
                                        <TableCell align="left">{variant.NAME}</TableCell>
                                        <TableCell align="center">
                                            <img
                                                alt='Hinh san pham'
                                                style={{ width: '100px' }}
                                                src={API_URL + image?.PATH} />

                                        </TableCell>
                                        <TableCell align="left" width={'400px'} >
                                            <div 
                                                style={{ overflow: 'auto', textOverflow: 'ellipsis', maxHeight: '100px' }}
                                                dangerouslySetInnerHTML={{ __html: e.DESCRIPTION }}>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack direction={'column'}>
                                                {
                                                    option.map((element, index)=>{
                                                        const price = sku.find((e)=> e.PRODUCT_OPTION_ID === element.PRODUCT_OPTION_ID)
                                                        return(
                                                            <div key={index}>{element.NAME} - 
                                                            { price ? <CurrencyFormat 
                                                                value={price.PRICE} 
                                                                thousandSeparator={true} 
                                                                suffix='đ' 
                                                                displayType={'text'}
                                                                style={{color: 'red'}} />
                                                            : 'null'
                                                            }
                                                            
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                                                <Link to={'/dashboard/update-product/'+e.PRODUCT_ID}>
                                                    <Button variant="contained" color='warning'>Sửa</Button>
                                                </Link>
                                                <Button variant="contained" color='error'
                                                    onClick={() => {
                                                        if (window.confirm('Xóa sản phẩm STT '+ (i+1)))
                                                            handleDelete(e.PRODUCT_ID, image.IMAGE_ID, image.PATH, sku)
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

export default Product