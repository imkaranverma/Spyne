import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../assets/buttonIcon/buttonIcon.png";
import React from "react";

export const HomepageCard = ({ icon, title, goto }: { icon?: string; title: string; goto: string }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white min-w-[14rem]  px-2 py-3 shadow-xl rounded-xl flex flex-col items-center justify-between">
      <img src={icon} className="w-[50%] max-w-20 h-full aspect-square my-4 p-3"></img>

      <div className="bg-[#DAE5FF] w-full flex justify-between rounded-md items-center">
        <Typography variant="subtitle1" noWrap={true} className="" sx={{ fontSize: 12, pl: "1rem" }}>
          {title}
        </Typography>
        {/* TODO: Use Material Icon here!!!*/}
        <div className="bg-[#407BFF]  p-3  rounded-md cursor-pointer" onClick={() => navigate(goto)}>
          <img src={ButtonIcon} className="w-[0.6rem] h-full aspect-square"></img>
        </div>
      </div>
    </div>
  );
};
