import React from "react";
import { HorizonalBorder } from "../components/Borders";
import Typography from "@mui/material/Typography";
import { twMerge } from "tailwind-merge";

export const CardLayout = ({ title, children, className }: { title?: React.ReactNode; children: React.ReactNode; className?: string }) => {
  return (
    <div className={twMerge("bg-white rounded-lg", className)}>
      {title && (
        <>
          <Typography variant="h6" color="initial" sx={{ padding: "1rem 2rem" }}>
            {title}
          </Typography>
          <HorizonalBorder />
        </>
      )}

      <div className="py-[1rem] px-[3rem]">{children}</div>
    </div>
  );
};
