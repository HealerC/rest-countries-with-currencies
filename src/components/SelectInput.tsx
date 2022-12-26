import React from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  items: string[];
};
const SelectInput = ({ value, onChange: handleChange, items }: Props) => {
  return (
    <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
      <Select value={value} onChange={handleChange}>
        {items.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
