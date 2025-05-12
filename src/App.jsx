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

const routes = createHashRouter([

    {path: '/', element: <Layout />, children: [

        {path: '/', element: <Home />},

        {path: '/events', element: <SubLayout />, children: [
            {path: '', element: <Events />},
            {path: 'single-event/:id', element: <SingleEvent />},
        ]},

        {path: '/admin-panel', element: <SubLayout />, children: [
            {path: '', element: <AdminPanel />},
            {path: 'add-event', element: <AddEvent />},
        ]}

    ]},

    {path: '/login', element: <Login />},
    {path: '/sign-up', element: <SignUp />},

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

    return <React.Fragment>

        <RouterProvider router={routes} />

    </React.Fragment>

}