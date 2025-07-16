import React from 'react';
import error from '../assets/error/error-page.jpg';
import { Link } from 'react-router';

const links = <>
        
  <Link to="/"> <button className='m-2 btn bg-green-600 text-white rounded-3xl'>Go Back Home Page</button></Link>

</>

const Error = () => {
    return (
        <div className='pt-20 mt-20'>
         
            <div className="flex justify-center mx-auto py-2">
                <img src={error} alt="" />
            </div>
            <div className="flex justify-center mx-auto ">
            {
                 links
             }
            </div>
        </div>
    );
};

export default Error;