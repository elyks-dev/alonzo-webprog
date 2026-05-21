import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111113]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;