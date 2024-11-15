import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export const BackButtonBar = ({ label }: { label: string }) => {
  const navigate = useNavigate();
  return (
    <div className="my-4 flex items-center gap-1">
      <ArrowLeftIcon
        sx={{ cursor: "pointer" }}
        onClick={() => {
          navigate(-1);
        }}
      />
      <Typography variant="h5" color="initial" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {label}
      </Typography>
    </div>
  );
};
