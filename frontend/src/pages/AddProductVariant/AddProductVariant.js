import { Button, Chip, Grid, Input, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { API_URL } from '../../Config'
import axiosJWT from '../../axiosJWT'

const AddProductVariant = () => {
    const [name, setName] = useState('');
    const [options, setOptions] = useState([])


    async function handleSubmit() {
        if (!name.trim()) {
            return;
        }
        try {
            const {data} = await addProductVariant()

            if (options.length !== 0)
                options.forEach((element)=>{
                    addProductOption(data.ID, element);
                })
            
            alert('Thêm thành công ')
            setName('')
            setOptions([])
        } catch (error) {
            alert('error');
            console.log(error);
        }
    }
    function addProductVariant() {
        return axiosJWT({
            method: 'post',
            url: API_URL + '/api/v1/productVariant',
            data: {
                NAME: name
            }
        })
    }
    function addProductOption(id, name) {
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
            setOptions([...options, e.target.value])
            e.target.value = ''
        }
    }
    function onClickDeleteOption(index){
        setOptions(preState => preState = options.filter((item, key)=> key !== index))
    }
    
    return (
        <div>
            <Grid spacing={1} container direction={'column'}>
                <Grid item>
                    <Typography variant='h6' gutterBottom>Thêm thể loại</Typography>
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
                        {   options ?
                                options?.map((e, index) => {
                                    return (
                                        <Chip
                                            key={index}
                                            label={e}
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
                    <Button variant='contained' color='success' onClick={handleSubmit}>Thêm</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddProductVariant