import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import Spinner from '../../components/Spinner'
import Forbidden from '../../components/Forbidden'
import UserHome from './Dashboard/UserHome';
import GuideHome from './Dashboard/GuideHome';
import AdminHome from './Dashboard/AdminHome';

const Body = () => {
  const {role, isLoading} = useUserRole();
  if (isLoading) {
  return <Spinner></Spinner>
  }
  if(role === 'user'){
    return <UserHome></UserHome>
  }else if(role === 'guide'){
    return <GuideHome></GuideHome>
  }else if(role === 'admin'){
    return <AdminHome></AdminHome>
  }else{
    return <Forbidden></Forbidden>
  }
   

};

export default Body;