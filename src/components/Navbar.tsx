import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const { lightMode, toggleMode } = useAppContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography component="h1" variant="h6">
            Where in the world?
          </Typography>
          <Button
            onClick={toggleMode}
            sx={{
              border: "1px solid white",
              color: "white",
              marginRight: "2rem",
              textTransform: "capitalize",
            }}
            startIcon={
              lightMode ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />
            }
          >
            {lightMode ? "Dark mode" : "Light mode"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
