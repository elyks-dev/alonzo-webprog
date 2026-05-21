import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#111113] text-zinc-100">
      <NavBar />

      <main className="min-h-screen bg-[#111113]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;