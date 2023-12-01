import { Button, Grid, Input, InputLabel, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { API_URL } from '../../Config';
import { useNavigate, useParams } from 'react-router-dom';
import axiosJWT from '../../axiosJWT';

const UpdateProduct = () => {
    const [productOptions, setProductOptions] = useState([])
    const [sku, setSku] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [oldImage, setOldImage] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const { data: dataProduct } = await getProduct(id)
            setName(dataProduct.NAME)
            setDescription(dataProduct.DESCRIPTION)

            const [{ data: dataOption }, { data: dataImage }, { data: dataSKU }] = await Promise.all([
                getAllOption(),
                getImage(id),
                getSKU(id)
            ])
            setSku(dataSKU)
            setOldImage(dataImage[0])
            setProductOptions(dataOption.filter((e) => e.PRODUCT_VARIANT_ID === dataProduct.PRODUCT_VARIANT_ID))
        }
        )()
    }, [])

    function getProduct(id) {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/product/' + id
        })
    }
    function getImage(id) {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/image/' + id
        })
    }
    function getSKU(idProduct) {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/sku/' + idProduct
        })
    }
    function getAllOption() {
        return axiosJWT({
            method: 'get',
            url: API_URL + '/api/v1/productOption'
        })
    }

    function handleChangePrice(event, skuID) {
        const data = sku.map((e,i)=>{
            if (e.SKU_ID === skuID) {
                e.PRICE = Number(event.target.value)
            }
            return e
        })
        setSku(data)
    }
    async function handleSubmit() {
       
        try {
            updateProduct(id)

            if(image)
                updateImage(oldImage.IMAGE_ID, image)

            sku.forEach((e)=>{
                updateSKU(e.SKU_ID, e.PRODUCT_ID, e.PRODUCT_OPTION_ID, e.PRICE)
            })
            
            alert('Update sản phẩm thành công')
            navigate('/dashboard/product')
        } catch (error) {
            console.log(error);
            alert('ERROR')
        }
    }
    function updateProduct(idProduct) {
        return axiosJWT({
            method: 'put',
            url: API_URL + '/api/v1/product/' + idProduct,
            data: {
                NAME: name,
                DESCRIPTION: description
            }
        })
    }
    function updateImage(imageID, image) {
        const formData = new FormData();
        formData.append('file', image);
        return axiosJWT({
            method: 'put',
            url: API_URL + '/api/v1/image/' + imageID,
            headers: {
                "content-type": "multipart/form-data"
            },
            data: formData
        })
    }
    function updateSKU(skuID, productID, optionID, price) {
        return axiosJWT({
          method: 'put',
          url: API_URL + '/api/v1/sku/'+skuID,
          data: {
            PRODUCT_OPTION_ID: optionID,
            PRODUCT_ID: productID,
            PRICE: price
          }
        })
      }
    return (
        <div>
            <Grid spacing={1} container direction={'column'}>
                <Grid item>
                    <Typography variant='h6' gutterBottom>Sửa sản phẩm</Typography>
                </Grid>
                <Grid item>
                    <InputLabel id="demo-simple-select-label">Tên sản phẩm</InputLabel>
                    <Input type='text' value={name} onChange={e => setName(e.target.value)} />
                </Grid>
                <Grid item>
                    <InputLabel id="demo-simple-select-label">Hình ảnh</InputLabel>
                    <Input type='file' onChange={e => setImage(e.target.files[0])} />
                </Grid>
                <Grid item>
                    {image ? 
                    <img alt='newImage' src={URL.createObjectURL(image)} style={{ width: '100px' }} /> 
                    : ''}
                </Grid>
                <Grid item>
                    {(oldImage && !image) ? 
                    <img alt='oldImage' src={API_URL + oldImage.PATH} style={{ width: '100px' }} /> 
                    : ''}
                </Grid>
                <Grid item>
                    {
                        sku?.map((e, i) => {
                            const nameOption = productOptions.find((element)=>element.PRODUCT_OPTION_ID === e.PRODUCT_OPTION_ID)
                            return (
                                <>
                                    <InputLabel>Giá tiền - {nameOption.NAME}</InputLabel>
                                    <Input type='number' value={e.PRICE} onChange={(event)=>{handleChangePrice(event,e.SKU_ID)}} key={i} />
                                </>
                            )
                        })
                    }
                </Grid>
                <Grid item>
                    <InputLabel id="demo-simple-select-label">Chi tiết</InputLabel>
                    <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button variant='contained' color='success' onClick={handleSubmit}>Lưu</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default UpdateProduct