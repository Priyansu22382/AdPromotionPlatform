import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarWrapper from '../components/Navbar/NavbarWrapper';

const CabDriverLayout = () => {
  console.log("cabDriverLayout rendering");
  return (
    <div>
      <NavbarWrapper/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default CabDriverLayout
