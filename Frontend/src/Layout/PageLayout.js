import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import MainNavbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { routeNames } from "../Utils/Utils"
function PageLayout() {
  return (
    <div>
        <MainNavbar/>
          <Outlet />
        <Footer/>
    </div>
  )
}

export default PageLayout