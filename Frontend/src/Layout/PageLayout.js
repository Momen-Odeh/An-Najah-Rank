import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { routeNames } from "../Utils/Utils"
function PageLayout() {
  return (
    <div>
        <h1>Header</h1>
          <Outlet />
        <h1>Footer</h1>
    </div>
  )
}

export default PageLayout