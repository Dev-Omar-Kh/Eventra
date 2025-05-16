import React, { useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useTranslation } from 'react-i18next';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/Login';
import Home from './Pages/Home/Home';
import Events from './Pages/Events/Events';
import SingleEvent from './Pages/Single-Event/SingleEvent';
import SubLayout from './Layout/SubLayout';
import AdminPanel from './Pages/Admin/AdminPanel';
import AddEvent from './Pages/Admin/AddEvent';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/authSlice';
import AdminRoute from './Protected-Routes/AdminRoute';
import UserBlockRoute from './Protected-Routes/UserBlockRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UpdateEvent from './Pages/Admin/UpdateEvent';
import BookedEvents from './Pages/Books/BookedEvents';
import UserRoute from './Protected-Routes/UserRoute';
import ErrorPage from './Components/Error/ErrorPage';

const routes = createHashRouter([

    {path: '/', element: <Layout />, children: [

        {path: '/', element: <Home />},

        {path: '/events', element: <SubLayout />, children: [
            {path: '', element: <Events />},
            {path: 'single-event/:id', element: <SingleEvent />},
        ]},

        {path: '/booked-events', element: <UserRoute><BookedEvents /></UserRoute>},

        {path: '/admin-panel', element: <AdminRoute><SubLayout /></AdminRoute>, children: [
            {path: '', element: <AdminPanel />},
            {path: 'add-event', element: <AddEvent />},
            {path: 'update-event-data/:id', element: <UpdateEvent />},
        ]},

        {path: '*', element: <ErrorPage />}

    ]},

    {path: '/login', element: <UserBlockRoute><Login /></UserBlockRoute>},
    {path: '/sign-up', element: <UserBlockRoute><SignUp /></UserBlockRoute>},


]);

export default function App() {

    const {i18n} = useTranslation();

    // ====== save-language ====== //

    useEffect(() => {

        const savedLang = localStorage.getItem('language');

        if(savedLang && i18n.language !== savedLang){
            i18n.changeLanguage(savedLang);
        }

        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    }, [i18n , i18n.language]);

    // ====== handle-delete-token-expired ====== //

    const dispatch = useDispatch();
    const expiresAt = useSelector(state => state.auth.expiresAt);

    useEffect(() => {

        if (expiresAt && Date.now() > Number(expiresAt)) {
        dispatch(logout());
        }
    }, [dispatch, expiresAt]);

    // ====== setup-react-query ====== //

    const queryClient = new QueryClient()

    return <React.Fragment>

        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
        </QueryClientProvider>

    </React.Fragment>

}