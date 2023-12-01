import { Button, Container, Grid, Input, InputLabel, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosJWT from '../../axiosJWT'
import { API_URL } from '../../Config'

const UserInfo = () => {
  const userID = localStorage.getItem('USER_ID')
  const [userName, setUserName] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  useEffect(() => {
    getInfoUser()
  }, [])

  function getInfoUser() {
    axiosJWT({
      method: 'get',
      url: API_URL + '/api/v1/user/' + userID
    })
      .then(({ data }) => {
        setName(data.NAME)
        setUserName(data.USER_NAME)
        setPhone(data.PHONE)
        setAddress(data.ADDRESS)
      })
      .catch((err) => {
        console.log(err);
        alert('ERROR')
      })
  }

  function handleUpdateInfoUser() {
    if (!name || !phone || !address) {
      alert('Vui lòng nhập đầy đủ thông tin')
      return
    } else {
      axiosJWT({
        method: 'put',
        url: API_URL + '/api/v1/user/' + userID,
        data: {
          NAME: name,
          PHONE: phone,
          ADDRESS: address
        }
      })
        .then(({ data }) => {
          alert(data.message)
        })
        .catch((err) => {
          console.log(err);
          alert('ERROR')
        })
    }
  }

  function handleUpdatePassword() {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('Vui lòng nhập đầy đủ mật khẩu')
      return 
    }else{
      axiosJWT({
        method: 'put',
        url: API_URL + '/api/v1/update-password/'+userID,
        data: {
          OLD_PASSWORD: oldPassword,
          NEW_PASSWORD: newPassword
        }
      })
      .then(({data})=>{
        alert(data.message)
      })
      .catch(({response})=>{
        alert('ERROR: '+ response.data.message)
      })
    }
  }

  function comparePassword(e) {
    setConfirmPassword(e.target.value.trim())

    if (newPassword !== e.target.value.trim()) {
      setError({...error, confirmPassword: 'Nhập lại không chính xác'})
    }else{
      setError({...error, confirmPassword: ''})
    }
  }
  return (
    <Container maxWidth="lg" sx={{ minHeight: '100%', padding: '80px 0' }}>
      <Typography variant='h6' padding={'16px 0'}>
        Thông tin tài khoản
      </Typography>
      <Grid xs={12} spacing={2} container direction={{xs: 'column', sm: 'row'}}>
        <Grid item xs={12} sm={6} container spacing={2} direction={'column'} alignItems={{xs: 'center', sm:'flex-start'}}>
          <Grid item>
            <InputLabel id="demo-simple-select-label">Họ Tên</InputLabel>
            <Input type='text' value={name} onChange={e => setName(e.target.value.trim())} sx={{ width: '300px' }} />
          </Grid>
          <Grid item>
            <InputLabel id="demo-simple-select-label">Số Điện Thoại</InputLabel>
            <Input type='text' value={phone} onChange={e => setPhone(e.target.value.trim())} sx={{ width: '300px' }} />
          </Grid>
          <Grid item>
            <InputLabel id="demo-simple-select-label">Địa chỉ</InputLabel>
            <Input type='text' value={address} onChange={e => setAddress(e.target.value.trim())} sx={{ width: '300px' }} />
          </Grid>
          <Grid item>
            <InputLabel id="demo-simple-select-label">User Name</InputLabel>
            <Input type='text' disabled value={userName} onChange={e => setUserName(e.target.value.trim())} sx={{ width: '300px' }} />
          </Grid>
          <Grid item >
            <Button color='success' variant='contained' onClick={handleUpdateInfoUser} >
              Lưu
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} container spacing={2} direction={'column'} alignItems={{xs: 'center', sm:'flex-start'}}>
          <Grid item  >
            <InputLabel id="demo-simple-select-label">Mật khẩu cũ</InputLabel>
            <Input type='password' value={oldPassword} onChange={e => setOldPassword(e.target.value.trim())} sx={{ width: '300px' }} />
            {
              error.oldPassword ?
                <Typography variant='body2' color={'error'}>{error.oldPassword}</Typography>
                : ''
            }
          </Grid>
          <Grid item  >
            <InputLabel id="demo-simple-select-label">Mật khẩu mới</InputLabel>
            <Input type='password' value={newPassword} onChange={e => setNewPassword(e.target.value.trim())} sx={{ width: '300px' }} />
            {
              error.newPassword ?
                <Typography variant='body2' color={'error'}>{error.newPassword}</Typography>
                : ''
            }
          </Grid>
          <Grid item  >
            <InputLabel id="demo-simple-select-label">Nhập lại mật khẩu mới</InputLabel>
            <Input type='password' value={confirmPassword} onChange={e => comparePassword(e)} sx={{ width: '300px' }} />
            {
              error.confirmPassword ?
                <Typography variant='body2' color={'error'}>{error.confirmPassword}</Typography>
                : ''
            }
          </Grid>
          <Grid item>
            <Button color='warning' onClick={handleUpdatePassword}>
              Đổi mật khẩu
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </Container>
  )
}

export default UserInfo