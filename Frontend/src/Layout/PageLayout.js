import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import MainNavbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { routeNames } from "../Utils/Utils"
function PageLayout() {
  const [activeTab, setActiveTab] = useState(routeNames.HOME)
  return (
    <div>
        <MainNavbar activeTab={activeTab}/>
          <Outlet context={setActiveTab}/>
        <Footer/>
    </div>
  )
}

export default PageLayout