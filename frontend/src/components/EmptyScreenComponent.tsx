import React from "react";
import { Typography } from "@mui/material";
export const EmptyScreenComponent = ({ label, description }: { label: string; description: string }) => (
  <div className="bg-gray-100 mx-4 my-4 w-full max-w-[580px] max-h-[421px]">
    <div className="content px-10 py-8 pb-20">
      <Typography variant="h4" className=" font-semibold">
        {label}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </div>
  </div>
);

export const NoDataView = ({ title, sub_title, image }: { title: string; sub_title: string; image?: string }) => (
  <div className="border-dashed border-2 border-text-4 p-6 relative my-4 rounded-lg">
    <div className="w-[80%]">
      <Typography variant="h4" className="font-semibold text-[1.125rem]">
        {title}
      </Typography>
      <Typography className="text-[0.75rem] mb-8">{sub_title}</Typography>
    </div>
    <img className="absolute bottom-0 right-0 translate-x-[50%] translate-y-[1%]" width="160" height="120" src={image} alt="" />
  </div>
);
