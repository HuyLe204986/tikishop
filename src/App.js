import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
// eslint-disable-next-line
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode';
import * as userService from './services/UserService'
import { useDispatch } from 'react-redux'
import { updateUser } from './redux/slides/userSlide';
export function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const  {storageData, decoded} = handleDecoded();
        if(decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData)
        }
        console.log('storage data: ' +storageData);
    }, []);

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {}
        if(storageData  && isJsonString(storageData)) {
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
        if(decoded?.exp < currentTime.getTime() / 1000) {
            const data = await userService.refreshToken();
            config.headers['token'] = `Bearer ${data?.access_token}`
        }
        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error);
    });

    const handleGetDetailsUser = async (id, token) => {
        const res = await userService.getDetailsUser(id, token);
        dispatch(updateUser({...res?.data, access_token: token}))
        console.log('res', res);
    }

    // const fetchApi = async () => {
    //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`);
    //     return res.data;
    // }
    // // Queries
    // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
    // console.log('query', query);
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                        return <Route key={route.path} path={route.path} element={
                            <Layout>
                                <Page />
                            </Layout>
                        } />;
                    })}
                </Routes>
            </Router>
        </div>
    );
}
export default App;
