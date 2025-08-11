import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarWrapper from '../components/Navbar/NavbarWrapper';

const AdminLayout = () => {
  console.log("Admin Layout rendering");
  return (
    <div>
      <NavbarWrapper/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout
