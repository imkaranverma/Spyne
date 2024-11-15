import React from "react";
import Typography from "@mui/material/Typography";
import { twMerge } from "tailwind-merge";

export const Formheadline = ({ title, className }: { title: string; className?: string }) => {
  const containerStyles = "h-fit w-full flex items-center my-4";

  return (
    <div className={twMerge(containerStyles, className)}>
      <Typography className="w-fit pr-4 text-nowrap" variant="h6" fontSize={15}>
        {title}
      </Typography>

      <div className="border border-xl flex-1"></div>
    </div>
  );
};
