import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import { routeNames } from '../../Utils/Utils';
import Details from '../../Components/Details';
const Home = () => {
    const setActiveTab = useOutletContext();
    useEffect(() => {
      setActiveTab(routeNames.HOME);
    }, []);
  return (
    <div>
      <Details/>
    </div>
  )
}

export default Home