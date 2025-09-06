import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/nav/Navbar'

const Layout = ({toggleNavbar}) => {
    
  return (
    <>
    <Navbar toggleNavbar={toggleNavbar}/>
     <main>
        <Outlet/>
     </main>
    </>
  )
}

export default Layout