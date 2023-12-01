import {  MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../Config'
import axiosJWT from '../../axiosJWT'
import CurrencyFormat from 'react-currency-format'

const Order = () => {
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState([])
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    getAllOrder()
    getAllStatus()
  }, [refresh])

  function getAllOrder() {
    axiosJWT({
      method: 'get',
      url: API_URL + '/api/v1/order'
    })
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function getAllStatus() {
    axiosJWT({
      method: 'get',
      url: API_URL + '/api/v1/status'
    })
      .then(({ data }) => {
        setStatus(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleChangeStatus(e, orderID) {
    if (window.confirm('Thay đổi trạng thái sản phẩm?')) {
      axiosJWT({
        method: 'put',
        url: API_URL + '/api/v1/order/'+orderID,
        data: {
          STATUS_ID: e.target.value
        }
      })
        .then(() => {
          setRefresh(refresh+1)
        })
        .catch((err) => {
          console.log(err);
          alert('ERROR')
        })
    }
  }
  return (
    <div>
      <Typography variant='h6'>Đặt hàng</Typography>
      <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Họ tên</TableCell>
              <TableCell align="left">Sản phẩm</TableCell>
              <TableCell align="left">Option</TableCell>
              <TableCell align="center">Hình ảnh</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="right">Giá</TableCell>
              <TableCell align="center">Ngày đặt hàng</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              orders?.map((element, index) => {
                const formatDate = new Date(element.DATE).toLocaleString().slice(9)
                return (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      {element.NAME_USER}
                      <Typography variant='body2'>
                        SĐT: {element.PHONE}
                      </Typography>
                      <Typography variant='body2'>
                        Địa chỉ: {element.ADDRESS}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{element.NAME_PRODUCT}</TableCell>
                    <TableCell align="left">{element.NAME_PRODUCT_OPTION}</TableCell>
                    <TableCell align="center">
                      <img
                        alt='Hinh san pham'
                        style={{ width: '100px' }}
                        src={API_URL + element.PATH_IMAGE} />
                    </TableCell>
                    <TableCell align="left">
                      <Select
                        value={element.STATUS_ID}
                        onChange={(e)=>handleChangeStatus(e, element.ORDER_ID)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {
                          status?.map((e, i) => {
                            return (
                              <MenuItem value={e.STATUS_ID}>{e.NAME}</MenuItem>
                            )
                          })
                        }
                      </Select>

                    </TableCell>
                    <TableCell align="right">
                      {element.QUANTITY}
                      *
                      <CurrencyFormat
                        value={element.PRICE_OF_SKU}
                        thousandSeparator={true}
                        suffix='đ'
                        displayType={'text'}
                      />
                      =
                      <CurrencyFormat
                        value={element.PRICE}
                        thousandSeparator={true}
                        suffix='đ'
                        displayType={'text'}
                        style={{ color: 'green', fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell align="center">{formatDate}</TableCell>
                    
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

export default Order