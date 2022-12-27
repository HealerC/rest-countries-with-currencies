import SearchIcon from "@mui/icons-material/Search";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { SxProps } from "@mui/material";

type Props = {
  sx?: SxProps;
  value: string;
  handleChange: Function;
};
const SearchBar = ({ value, handleChange, sx }: Props) => {
  return (
    <FormControl /*sx={{ width: "30vw" }}*/ sx={sx} variant="filled">
      <FilledInput
        id="search"
        type="text"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder="Search for a country..."
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        disableUnderline={true}
      />
    </FormControl>
  );
};

export default SearchBar;
