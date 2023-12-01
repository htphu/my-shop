import React, { useEffect } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import axiosJWT from '../../axiosJWT'
import { API_URL } from '../../Config'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const navigate = useNavigate()
  useEffect(() => {
    privateRouter()
  }, [])
  
  async function privateRouter() {
    try {
      await isAdmin()
      return
    } catch (error) {
      navigate('/')
    }
  }
  function isAdmin() {
    return axiosJWT({
      method: 'post',
      url: API_URL + '/api/v1/isadmin'
    })
  }
  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight:'100vh'}}>
      <SideBar/>
    </div>
  )
}

export default DashBoard