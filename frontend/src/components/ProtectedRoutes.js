import axios from 'axios';
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../util/api';


const ProtectedRoutes = () => {

  useEffect(() => {
    // getToken()
      // .then((data)=>{
      //   console.log(data)
      // })
  }, [])
  

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ProtectedRoutes