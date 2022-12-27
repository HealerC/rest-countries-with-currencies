import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";

const SharedLayout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default SharedLayout;
