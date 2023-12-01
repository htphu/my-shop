import { Button, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { API_URL } from '../../Config';
import { useNavigate } from 'react-router-dom';
import axiosJWT from '../../axiosJWT';

const AddProduct = () => {
  const [productVariants, setProductVariants] = useState([])
  const [productOptions, setProductOptions] = useState([])
  const [sku, setSku] = useState({})
  const [name, setName] = useState('')
  const [variantID, setVariantID] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    getAllVariant()
  }, [])

  function getAllVariant() {
    axiosJWT({
      method: 'get',
      url: API_URL + '/api/v1/productVariant'
    })
      .then(({ data }) => {
        setProductVariants(data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  function getOptions(id) {
    axiosJWT({
      method: 'get',
      url: API_URL + '/api/v1/productOption'
    })
      .then(({ data }) => {
        setProductOptions(data.filter((e) => e.PRODUCT_VARIANT_ID === id))
      })
      .catch((error) => {
        console.log(error);
      })
  }
  function onSelectVariant(e) {
    if (!e.target.value)
      return;
    setVariantID(e.target.value)
    getOptions(e.target.value)
  }

  function handleChangePrice(event) {
    const { name, value } = event.target;
    //{PRODUCT_OPTION_ID: PRICE}
    setSku(prev => {
      return { ...prev, [name]: Number(value) };
    });
  }

  function addProduct() {
    return axiosJWT({
      method: 'post',
      url: API_URL + '/api/v1/product',
      data: {
        PRODUCT_VARIANT_ID: variantID,
        NAME: name,
        DESCRIPTION: description
      }
    })
  }

  function addImage(productID) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('PRODUCT_ID', productID);

    return axiosJWT( {
      method: 'post',
      url: API_URL + '/api/v1/image',
      headers: {
        "content-type": "multipart/form-data"
      },
      data:formData
    })
  }

  function addSKU(productID, optionID, price) {
    return axiosJWT({
      method: 'post',
      url: API_URL + '/api/v1/sku',
      data: {
        PRODUCT_OPTION_ID: optionID,
        PRODUCT_ID: productID,
        PRICE: price
      }
    })
  }
  async function handleSubmit() {
    if (!name || !image || !variantID) {
      return
    }
    try {
      const { data } = await addProduct()

      addImage(data.ID)

      for (const [key, value] of Object.entries(sku)) {
        if(value === 0)
          continue;

        await addSKU(data.ID, key, value)
      }
      alert('Thêm sản phẩm thành công')
      navigate('/dashboard/product')
    } catch (error) {
      console.log(error);
      alert('ERROR')
    }
  }
  return (
    <div>
      <Grid spacing={1} container direction={'column'}>
        <Grid item>
          <Typography variant='h6' gutterBottom>Thêm sản phẩm</Typography>
        </Grid>
        <Grid item>
          <InputLabel id="demo-simple-select-label">Tên sản phẩm</InputLabel>
          <Input type='text' onChange={e => setName(e.target.value)} />
        </Grid>
        <Grid item>
          <InputLabel id="demo-simple-select-label">Hình ảnh</InputLabel>
          <Input type='file' onChange={e => setImage(e.target.files[0])} />
        </Grid>
        <Grid item>
          { image && <img src={URL.createObjectURL(image)} alt='Hình sản phẩm' style={{width:"100px"}}/>}
        </Grid>
        <Grid item>
          <InputLabel id="demo-simple-select-label">Thể loại</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Thể loại"
            sx={{ minWidth: '180px' }}
            onChange={onSelectVariant}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {
              productVariants?.map((e) => {
                return (
                  <MenuItem value={e.PRODUCT_VARIANT_ID}>{e.NAME}</MenuItem>
                )
              })
            }
          </Select>
          {
            productOptions?.map((e, i) => {
              return (
                <>
                  <InputLabel>Giá tiền - {e.NAME}</InputLabel>
                  <Input name={e.PRODUCT_OPTION_ID} onChange={handleChangePrice} key={i} />
                </>
              )
            })
          }
        </Grid>
        <Grid item>
          <InputLabel id="demo-simple-select-label">Chi tiết</InputLabel>
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </Grid>
        <Grid item>
          <Button variant='contained' color='success' onClick={handleSubmit}>Thêm</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddProduct