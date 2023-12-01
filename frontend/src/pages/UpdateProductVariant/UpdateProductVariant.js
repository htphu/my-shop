import { Button, Chip, Grid, Input, ListItem, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../Config'
import { useNavigate, useParams } from 'react-router-dom';
import axiosJWT from '../../axiosJWT';

const UpdateProductVariant = () => {
    const [name, setName] = useState('');
    const [options, setOptions] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getProductVariant()
        getProductOption()
    }, [])

    function getProductVariant() {
        axios({
            method: 'get',
            url: API_URL + '/api/v1/productVariant/' + id,
        })
        .then(({data})=>{
            setName(data.NAME);
        })
        .catch((error)=>{
            alert('error')
            console.log(error);
        })
    }
    function getProductOption() {
        axios({
            method: 'get',
            url: API_URL + '/api/v1/productOption',
        })
        .then(({data})=>{
            setOptions(data.filter((element)=> element.PRODUCT_VARIANT_ID == id));
        })
        .catch((error)=>{
            alert('error')
            console.log(error);
        })
    }
    async function handleSubmit() {
        if (!name.trim()) {
            return;
        }
        try {
            await UpdateProductVariant()

            if (options.length !== 0)
                options.forEach((element) => {
                    if (!element.PRODUCT_OPTION_ID) {
                        AddProductOption(element.NAME);
                    }else if(element.isDelete){
                        deleteProductOption(element.PRODUCT_OPTION_ID)
                    }
                })

            alert('Update thành công ')
            navigate('/dashboard/product-variant')
        } catch (error) {
            alert('error');
            console.log(error);
        }
    }
    function UpdateProductVariant() {
        return axiosJWT({
            method: 'put',
            url: API_URL + '/api/v1/productVariant/'+id,
            data: {
                NAME: name
            }
        })
    }
    function deleteProductOption(idOption) {
        return axiosJWT({
            method: 'delete',
            url: API_URL + '/api/v1/productOption/'+idOption,
        })
    }
    function AddProductOption(name) {
        return axiosJWT({
            method: 'post',
            url: API_URL + '/api/v1/productOption',
            data: {
                PRODUCT_VARIANT_ID: id,
                NAME: name
            }
        })
    }

    function onEnterOption(e) {
        if (e.key === 'Enter') {
            setOptions([...options,{NAME: e.target.value}])
            e.target.value = ''
        }
    }
    function onClickDeleteOption(index) {
        setOptions(options.map((e,i)=>{
            if (i == index) {
                return {...e, isDelete:true}
            }
            return e
        }))
    }
    return (
        <div>
            <Grid spacing={1} container direction={'column'}>
                <Grid item>
                    <Typography variant='h6' gutterBottom>Sửa thể loại</Typography>
                </Grid>
                <Grid item>
                    <Input
                        placeholder="NAME"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Typography variant='h6' gutterBottom>Option</Typography>
                    <ListItem>
                        {options ?
                            options.map((e, index) => {
                                if (!e.isDelete) 
                                    return (
                                        <Chip
                                            key={index}
                                            label={e.NAME}
                                            onDelete={() => onClickDeleteOption(index)}
                                            color="primary"
                                        />
                                    )
                            })
                            : ''
                        }

                    </ListItem>
                </Grid>
                <Grid item>
                    <Input
                        placeholder="Option"
                        onKeyDown={onEnterOption}
                    />
                </Grid>


                <Grid item>
                    <Button variant='contained' color='success' onClick={handleSubmit}>Lưu</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default UpdateProductVariant