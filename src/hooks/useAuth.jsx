import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const useAuth = () => {
    const authInfo = use(AuthContext);

    // console.log(authInfo);
    

    return authInfo;
};

export default useAuth;