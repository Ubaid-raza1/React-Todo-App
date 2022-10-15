import React from "react";
import { Button } from "@mui/material";

const SButton = ({
  Type,
  Varaint,
  color,
  value,
  size,
  id,
  disabled,
  onClick,
  startIcon,
  endIcon,
  loading,
  
}) => {
  return (
    <>
      <Button
        variant={Varaint}
        type={Type}
        color={color}
        size={size}
        id={id}
        disabled={disabled}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
      >
        {`${loading ? value : "||||||"}`}
      </Button>
    </>
  );
};

export default SButton;
