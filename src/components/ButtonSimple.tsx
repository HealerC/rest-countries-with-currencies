import React from "react";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/system";
type Props = {
  children: React.ReactNode;
  sx?: SxProps;
  variant?: "text" | "outlined" | "contained";
  startIcon: React.ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
const ButtonSimple = ({
  sx,
  variant = "text",
  startIcon,
  handleClick,
  children,
}: Props) => {
  return (
    <Button
      sx={sx}
      variant={variant}
      startIcon={startIcon}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default ButtonSimple;
