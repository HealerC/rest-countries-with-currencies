import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const { lightMode, toggleMode } = useAppContext();

  return (
    <div>
      <h2>Where in the world</h2>
      <div onClick={toggleMode}>{lightMode ? "Light mode" : "Dark mode"}</div>
    </div>
  );
};

export default Navbar;
