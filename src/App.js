import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
// eslint-disable-next-line
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode';
import * as userService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from './redux/slides/userSlide';
import Loading from './components/LoadingComponent/Loading';
export function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);   
    const user = useSelector((state) => state.user)
    useEffect(() => {
        setIsLoading(true);
        const  {storageData, decoded} = handleDecoded();
        if(decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData)
        }
        setIsLoading(false);
    }, []);

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {}
        if(storageData  && isJsonString(storageData) && !user?.access_token) {
            storageData = JSON.parse(storageData);
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData }
    }

    // Add a request interceptor
    //nếu token hết hạn thì gọi refresh-token lấy ra token mới và đặt vào config
    userService.axiosJWT.interceptors.request.use(async (config) => {
        // Do something before request is sent
        const currentTime = new Date();
        const  { decoded } = handleDecoded();
        let storageRefreshToken = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storageRefreshToken)
        const decodedRefreshToken =  jwtDecode(refreshToken)
        if(decoded?.exp < currentTime.getTime() / 1000) {
            if(decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
                const data = await userService.refreshToken(refreshToken)
                config.headers['token'] = `Bearer ${data?.access_token}`
              }else {
                dispatch(resetUser())
              }
        }
        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error);
    });

    const handleGetDetailsUser = async (id, token) => {
        let storageRefreshToken = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storageRefreshToken)
        const res = await userService.getDetailsUser(id, token);
        dispatch(updateUser({...res?.data, access_token: token, refreshToken: refreshToken}))
    }

    // const fetchApi = async () => {
    //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`);
    //     return res.data;
    // }
    // // Queries
    // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
    return (
        <div style={{height: '100vh', width: '100%'}}>
            <Loading isLoading={isLoading}>
                <Router>
                    <Routes>
                        {routes.map((route) => {
                            const Page = route.page;
                            const isCheckAuth = !route.isPrivate || user.isAdmin
                            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                            //isCheckAuth &&
                            return <Route key={route.path} path={ route.path} element={
                                <Layout>
                                    <Page />
                                </Layout>
                            } />;
                        })}
                    </Routes>
                </Router>
            </Loading>
        </div>
    );
}
export default App;
