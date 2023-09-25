import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import { routeNames } from '../../Utils/Utils';

const Home = () => {
    const setActiveTab = useOutletContext();
    useEffect(() => {
      setActiveTab(routeNames.HOME);
    }, []);
  return (
    <h1>Home</h1>
  )
}

export default Home