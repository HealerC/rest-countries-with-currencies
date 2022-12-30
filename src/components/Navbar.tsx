import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppContext } from "../context/appContext";
import ButtonSimple from "./ButtonSimple";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { lightMode, toggleMode } = useAppContext();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            component="h1"
            variant="h6"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            Where in the world?
          </Typography>

          {/* {lightMode ? (
            <ButtonSimple
              handleClick={toggleMode}
              sx={{
                border: "1px solid white",
                marginRight: "2rem",
                textTransform: "capitalize",
              }}
              startIcon={<LightModeIcon />}
            >
              Light mode
            </ButtonSimple>
          ) : (
            <ButtonSimple
              handleClick={toggleMode}
              sx={{
                border: "1px solid white",
                color: "black",
                marginRight: "2rem",
                textTransform: "capitalize",
              }}
              startIcon={<DarkModeIcon />}
            >
              Dark mode
            </ButtonSimple>
          )} */}
          <ButtonSimple
            handleClick={toggleMode}
            variant="text"
            sx={{
              // border: "1px solid white",
              // color: "black",
              marginRight: "2rem",
              textTransform: "capitalize",
              color: "text.primary",
              ["@media (max-width: 600px)"]: {
                marginRight: "initial",
              },
            }}
            startIcon={lightMode ? <LightModeIcon /> : <DarkModeIcon />}
          >
            {lightMode ? "Light mode" : "Dark mode"}
          </ButtonSimple>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
