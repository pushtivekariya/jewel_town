import { Login } from '@mui/icons-material'
import React from 'react'
import { Route } from 'react-router-dom'
import Footer from './component/footer/footer'
import Header from './component/header/header'
import Routing from './Routing'

function CommonRoutes() {
  return (
    <>
   <Header/>
      <Routing/>
      <Footer/>
    </>
  )
}

export default CommonRoutes