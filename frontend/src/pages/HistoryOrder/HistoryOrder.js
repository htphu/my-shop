import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosJWT from '../../axiosJWT'
import { API_URL } from '../../Config'
import CurrencyFormat from 'react-currency-format'
import { RemoveShoppingCart } from '@mui/icons-material'

const HistoryOrder = () => {
  const userID = localStorage.getItem('USER_ID')
  const [orders, setOrders] = useState([])
  const [Refresh, setRefresh] = useState(0)

  const STATUS_ID = 1; //Đang xử lý

  useEffect(() => {
    fetchData()
  }, [Refresh])

  async function fetchData() {
    try {
      const dataOrder = await getOrders()
      setOrders(dataOrder.data);
    } catch (error) {
      console.log(error);
      alert('ERROR')
    }

  }
  function getOrders() {
    return axiosJWT({
      method: 'get',
      url: API_URL + '/api/v1/order-user/' + userID
    })
  }

  function handleCancelOrder(idOrder) {
    const STATUS_CANCEL = 4 //id status: hủy đơn hàng
    if (window.confirm("Hủy đơn hàng?")) {
      axiosJWT({
        method: 'put',
        url: API_URL + '/api/v1/order/' + idOrder,
        data: {
          STATUS_ID: STATUS_CANCEL
        }
      })
        .then(() => {
          setRefresh(Refresh + 1)
        })
        .catch((err) => {
          console.log(err);
          alert('ERROR: hủy đơn hàng')
        })
    }
  }
  return (
    <Container maxWidth="lg" sx={{ minHeight: '100%', padding: '80px 0' }}>
      <Typography variant='h6'>
        Lịch sử mua hàng
      </Typography>
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
                    <TableCell align="left">{element.NAME_STATUS}</TableCell>
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
                    <TableCell align="center">
                      {
                        (element.STATUS_ID === STATUS_ID) ?
                          <IconButton color='error' onClick={() => handleCancelOrder(element.ORDER_ID)}>
                            <RemoveShoppingCart />
                          </IconButton>
                          : ''
                      }

                    </TableCell>
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default HistoryOrder