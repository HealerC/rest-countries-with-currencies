import React from "react";
import Button from "@mui/material/Button";

type Props = {
  children: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
  startIcon: React.ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
const ButtonSimple = ({
  variant = "contained",
  startIcon,
  handleClick,
  children,
}: Props) => {
  return (
    <Button variant={variant} startIcon={startIcon} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default ButtonSimple;
