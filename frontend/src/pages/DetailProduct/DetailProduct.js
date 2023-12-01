import { AddCircle, Send } from '@mui/icons-material'
import { Button, Container, Divider, Grid, IconButton, Input, InputAdornment, Rating, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../Config'
import axios from 'axios'
import axiosJWT from '../../axiosJWT'

const DetailProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [image, setImage] = useState([])
    const [sku, setSKU] = useState([])
    const [skuId, setskuId] = useState('')
    const [options, setOptions] = useState([])
    const [priceOption, setPriceOption] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState(1)
    const userID = localStorage.getItem('USER_ID')
    const [comment, setComment] = useState('')
    const [star, setStar] = useState(0)
    const [reviews, setReviews] = useState([])
    const [isDisableReview, setIsDisableReview] = useState(true)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        fetchData()
    }, [refresh])

    async function fetchData() {
        try {
            const [dataProduct, dataImage, dataSKU, dataOption, dataReview] = await Promise.all([
                getProduct(),
                getImage(),
                getSKU(),
                getOptions(),
                getReviews()
            ])
            setProduct(dataProduct.data)
            setImage(dataImage.data[0])
            setSKU(dataSKU.data)
            setOptions(dataOption.data)
            setReviews(dataReview.data)
            handleDisableReview()
        } catch (error) {
            console.log(error);
            alert('ERROR');
        }
    }
    function getProduct() {
        return axios({
            method: 'get',
            url: API_URL + '/api/v1/product/' + id
        })
    }
    function getImage() {
        return axios({
            method: 'get',
            url: API_URL + '/api/v1/image/' + id
        })
    }
    function getSKU() {
        return axios({
            method: 'get',
            url: API_URL + '/api/v1/sku/' + id
        })
    }
    function getOptions() {
        return axios({
            method: 'get',
            url: API_URL + '/api/v1/productOption'
        })
    }
    function getReviews() {
        return axios({
            method: 'get',
            url: API_URL + '/api/v1/review/' + id
        })
    }
    function handleChangeOption(event, value) {
        if (value === null)
            return
        // Gia tien cua option
        const { PRICE } = sku.find((e) => e.SKU_ID === value)
        setskuId(value)
        setPriceOption(PRICE)
        setPrice(Number(PRICE) * Number(quantity))
    }
    function handleChangeQuatity(event) {
        if (skuId) {
            setQuantity(event.target.value)
            setPrice(Number(event.target.value) * Number(priceOption))
        }else{
            setQuantity(event.target.value)
        }
    }
    function handleSubmit() {
        const data = {
            USER_ID: userID,
            PRODUCT_ID: id,
            SKU_ID: skuId,
            QUANTITY: quantity,
            PRICE: price,
            DATE: new Date().toISOString().slice(0, 10),
            STATUS_ID: 1
        }
        if (!data.SKU_ID) {
            return
        }

        axiosJWT({
            method: 'post',
            url: API_URL + '/api/v1/order',
            data: data
        })
            .then(({ data }) => {
                alert(data.message);
            })
            .catch((err) => {
                console.log(err);
                alert('Order thất bại')
            })
    }
    function handlePostReview() {
        if (comment.trim() === '') {
            return
        } else {
            axiosJWT({
                method: 'post',
                url: API_URL + '/api/v1/review',
                data: {
                    USER_ID: userID,
                    PRODUCT_ID: id,
                    STAR: star,
                    COMMENT: comment
                }
            })
                .then(() => {
                    setComment('')
                    setStar(0)
                    setRefresh(refresh + 1)
                })
                .catch((err) => {
                    console.log(err);
                    alert('ERROR')
                })
        }
    }
    async function handleDisableReview() {
        const { data: dataOrder } = await getOrders()
        let exitsReview = []
        let order = []
        const STATUS_ID = 3 //đã nhận
        //đã order và status order = 3 (đã nhận)
        order = dataOrder.filter(element => {
            if ((element.PRODUCT_ID === Number(id)) && (element.STATUS_ID === STATUS_ID)) {
                return true
            }else{
                return false
            }
        });
        //đã đánh giá sản phẩm
        exitsReview = reviews.length > 0 ? reviews.find(e => e.USER_ID == userID) : [];

        if (exitsReview.length === 0 && userID && order.length !== 0 && exitsReview.length < order.length) {
            //cho đánh giá
            setIsDisableReview(false)
            return
        } else {
            //không cho đánh giá
            setIsDisableReview(true)
            return
        }
        
    }
    function getOrders() {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/order-user/' + userID
        })
    }
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100vh', bgcolor: 'white' }}>
            <Grid container paddingTop={'120px'} paddingBottom={"60px"} rowGap={4}>
                <Grid xs={12} md={6} paddingRight={'16px'}>
                    <img
                        style={{ width: '100%' }}
                        alt='hinh anh san pham'
                        src={image ? (API_URL + image.PATH) : ''}
                    />
                </Grid>
                <Grid xs={12} md={6} container flexDirection={'column'} alignItems={'flex-star'} gap={1}>
                    <Stack gap={1} >
                        <Typography variant='h6'>{product?.NAME}</Typography>
                        <Typography>Option:</Typography>
                        <Stack direction={'row'} gap={1}>
                            <ToggleButtonGroup
                                color="success"
                                exclusive
                                value={skuId}
                                onChange={handleChangeOption}
                                aria-label="Platform"
                            >
                                {
                                    sku?.map((element, index) => {
                                        const option = options.find((e) => e.PRODUCT_OPTION_ID === element.PRODUCT_OPTION_ID)
                                        return (
                                            <ToggleButton
                                                value={element.SKU_ID}
                                                key={index}
                                            >
                                                {option.NAME}
                                            </ToggleButton>
                                        )
                                    })
                                }


                            </ToggleButtonGroup>
                        </Stack>
                        <Typography>Số lượng:</Typography>
                        <input
                            onChange={handleChangeQuatity}
                            type='number'
                            defaultValue={1}
                            step={1} min={1}
                            style={{ outline: 'none', padding: '6px 8px', width: 'fit-content' }}></input>
                        <Typography>Giá tiền:
                            <CurrencyFormat
                                value={price}
                                thousandSeparator={true}
                                suffix='đ'
                                displayType={'text'}
                                style={{ color: 'red' }} />
                        </Typography>
                    </Stack>
                    <Button onClick={handleSubmit} sx={{ width: 'fit-content' }} variant="contained" color='success' starIcon={<AddCircle />}>
                        Đặt mua
                    </Button>
                </Grid>
                <Grid xs={12}>
                    <Typography variant='h6'>Chi Tiết Sản Phẩm</Typography>
                    <Typography variant='body2' dangerouslySetInnerHTML={{ __html: product?.DESCRIPTION }}></Typography>
                </Grid>
                <Grid container xs={12} rowGap={2}>
                    <Grid xs={12}>
                        <Typography variant='h6'>Đánh giá</Typography>
                    </Grid>
                    <Grid xs={12}
                        padding={'16px'}
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-star',
                            flexDirection: 'column',
                            backgroundColor: "#F5F5F5",
                            borderRadius: "8px"
                        }}
                    >
                        
                        <Typography variant="body2" display="block" gutterBottom>Thêm đánh giá</Typography>
                        <div>
                        <Rating size="medium" disabled={isDisableReview} value={star} onChange={(event, newValue) => setStar(newValue)} />
                        </div>
                        <Input fullWidth placeholder='Nội dung'
                            disabled={isDisableReview}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton color="primary" disabled={isDisableReview} onClick={handlePostReview}>
                                        <Send />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    {
                        reviews?.map((element, index) => {
                            return (
                                <Grid xs={12} key={index}>
                                    <Typography variant="caption" display="block" fontWeight={'bold'} gutterBottom>{element.NAME_USER}</Typography>
                                    <Rating size="medium" name="disabled" value={element.STAR} disabled />
                                    <Typography >{element.COMMENT}</Typography>
                                    <Divider />
                                </Grid>
                            )
                        })
                    }

                </Grid>
            </Grid>
        </Container>
    )
}

export default DetailProduct