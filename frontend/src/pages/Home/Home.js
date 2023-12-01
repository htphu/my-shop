import { Card, CardActionArea, CardContent, CardMedia, Container, Divider, FormControl, FormControlLabel, FormLabel, Input, InputAdornment,  Radio, RadioGroup, Stack, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from '../../Config';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const Home = () => {
    const [dataProduct, setDataProduct] = useState([])
    const [data, setData] = useState([])
    const [dataImage, setDataImage] = useState([])
    const [dataSKU, setDataSKU] = useState([])
    const [dataVariant, setDataVariant] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const [images, SKU, variants] = await Promise.all([
                getImages(),
                getSKU(),
                getDataVariant()
            ])
            setDataImage(images.data)
            setDataSKU(SKU.data)
            setDataVariant(variants.data)
            const products = await getDataProduct()
            setDataProduct(products.data)
            setData(products.data)
        } catch (error) {
            console.log(error)
            alert('ERROR')
        }
    }
    function getDataProduct() {
        return axios({
            method: 'get',
            url: API_URL + '/api/v1/product'
        })
    }
    function getDataVariant() {
        return axios({
            method: 'get',
            url: API_URL + '/api/v1/productVariant'
        })
    }
    function getImages() {
        return axios({
            method: 'get',
            url: API_URL + '/api/v1/image'
        })
    }
    function getSKU() {
        return axios({
            method: 'get',
            url: API_URL + '/api/v1/sku'
        })
    }
    function handleFilter(e) {
        if (e.target.value) {
            const datafilter = data.filter(element => Number(element.PRODUCT_VARIANT_ID) === Number(e.target.value))
            setDataProduct(datafilter)
        } else {
            setDataProduct(data)
        }
    }
    function handleSearch(e) {
        const searchValue = (e.target.value).trim()
        if (searchValue) {
            const datafilter = data.filter(element => element.NAME.includes(searchValue))
            setDataProduct(datafilter)
        } else {
            setDataProduct(data)
        }
    }
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100vh' }}>
            <Grid container paddingTop={'120px'} paddingBottom={"60px"}>
                <Grid xs={12} md={12} lg={3} container  gap={2} direction={{md: 'row',lg: 'column'}} alignItems='flex-start' justifyContent='flex-start'>
                    <Typography >
                        Sắp xếp theo
                    </Typography>
                    {/* Search bar */}
                    <Grid >
                        <Input
                            placeholder="Tên sản phẩm"

                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            onChange={handleSearch}
                        />
                    </Grid>
                    {/* Filter */}
                    <Grid container direction={{md: 'row',lg: 'column'}} gap={2}>
                            <FormLabel id="demo-radio-buttons-group-label">Thể loại</FormLabel>
                            <RadioGroup
                                sx={{display: 'flex', flexDirection:{xs: 'row', lg:'column'}}}
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                onChange={handleFilter}
                                defaultValue={''}
                            >
                                <FormControlLabel
                                    value={''}
                                    control={<Radio />}
                                    label={'Tất cả'} />
                                {
                                    dataVariant?.map((element, index) => {

                                        return (
                                            <FormControlLabel
                                                key={index}
                                                value={element.PRODUCT_VARIANT_ID}
                                                control={<Radio />}
                                                label={element.NAME} />
                                        )
                                    })
                                }

                            </RadioGroup>

                    </Grid>
                </Grid>
                <Grid xs={12} md={12} lg={9} direction="row" container spacing={2}>
                    {
                        dataProduct?.map((element, index) => {
                            const image = dataImage.find((e) =>
                                e.PRODUCT_ID === element.PRODUCT_ID)
                            const price = dataSKU.filter((e) =>
                                e.PRODUCT_ID === element.PRODUCT_ID
                            )
                            return (
                                <Grid xs={6} md={4}>
                                    <Card
                                        key={index}
                                        sx={{ maxWidth: 345 }}>

                                        <CardActionArea onClick={() => navigate('chitietsanpham/' + element.PRODUCT_ID)}>
                                            <CardMedia
                                                component="img"
                                                height={276}
                                                src={API_URL + image.PATH}
                                                alt="hinh san pham"
                                            />
                                            <CardContent>
                                                <Tooltip title={element.NAME}>
                                                    <Typography gutterBottom
                                                        variant="h5"
                                                        component="div"
                                                        sx={{
                                                            textOverflow: 'ellipsis',
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {element.NAME}
                                                    </Typography>
                                                </Tooltip>
                                                <Typography variant="body2" color="text.secondary"
                                                >
                                                    Giá:

                                                    <Stack
                                                        direction="row"
                                                        divider={<Divider orientation="vertical" flexItem />}
                                                        spacing={1}
                                                        useFlexGap
                                                        flexWrap="no-wrap"
                                                    >
                                                        {
                                                            price.map((e) => {
                                                                return <CurrencyFormat
                                                                    value={e.PRICE}
                                                                    thousandSeparator={true}
                                                                    suffix='đ'
                                                                    displayType={'text'}
                                                                    style={{ color: 'red' }} />
                                                            })
                                                        }
                                                    </Stack>
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })
                    }



                </Grid>
            </Grid>
        </Container >
    )
}

export default Home