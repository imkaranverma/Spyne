import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[100%] h-[100vh] p-20 bg-[url('src/assets/errorIcon.jpg')] bg-[length:auto_100%] bg-no-repeat bg-right bg-white">
        <div className="w-[70%]">
          <Typography variant="h1" fontSize={60} className="py-6 text-voilet-600">
            {" "}
            Oops, Wrong Turn...
          </Typography>
          <Typography className="w-[60%] py-8" variant="h5">
            Looks like you're wandered off the beaten path Our Team is working on getting back you to correct track and find you what you what you are looking for.
          </Typography>
          <Button variant="outlined" size="large" className="py-6" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>

      {/* <div>
        
    </div> */}
    </>
  );
};
