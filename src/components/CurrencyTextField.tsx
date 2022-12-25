import React from "react";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

type Props = {
  symbol: string;
  name: string;
  value: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CurrencyTextField = ({ symbol, name, value, handleChange }: Props) => {
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
      <FilledInput
        type="number"
        name={name}
        value={value}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">{symbol}</InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CurrencyTextField;
