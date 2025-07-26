import axios from 'axios';


const axiosUserSecure = axios.create({
    baseURL: `https://gobangla-server.vercel.app/`
})

const useAxios = () => {
    return axiosUserSecure;
};

export default useAxios;