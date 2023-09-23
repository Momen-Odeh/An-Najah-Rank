import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import MainNavbar from "../Components/Navbar"
import { routeNames } from "../Utils/Utils"
function PageLayout() {
  return (
    <div>
        <MainNavbar/>
          <Outlet />
        <h1>Footer</h1>
    </div>
  )
}

export default PageLayout