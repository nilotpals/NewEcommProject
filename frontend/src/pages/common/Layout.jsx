import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({children})  {

    return (
        <>
            <Header/>
            <Sidebar/>
                <main>{children}</main>
            <Footer/>
        </>
    );

}

export default Layout;