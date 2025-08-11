import { Outlet } from "react-router-dom";
import NavbarWrapper from "../components/Navbar/NavbarWrapper";

const CompanyLayout = () => {
  console.log("CompanyLayout rendering");
  
  return (
    <div>
      <NavbarWrapper />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default CompanyLayout;