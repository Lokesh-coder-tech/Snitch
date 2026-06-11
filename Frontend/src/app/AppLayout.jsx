import React from 'react'
import Nav from "../features/shared/components/Nav"
import { Outlet } from 'react-router'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
  return (
    <>
      <Nav/>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
      />
    </>
  )
}

export default AppLayout
