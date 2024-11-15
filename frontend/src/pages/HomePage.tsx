import React, { useEffect } from "react";
import { HomepageMenu } from "../components/HomepageMenu";
import HomepageBG from "../assets/homepageIcon/icon.png";
import { useAuthData, useConfigData } from "src/hooks/customHooks";
import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "src/api/apiQuery";

export const HomePage = () => {
  const { authData } = useAuthData();
  const navigate = useNavigate();
  const { configData } = useConfigData();

  console.log(configData);
  useEffect(() => {
    // if (!authData || !authData.access) {
    //   // store.dispatch(removeUser());
    //   if (location.pathname != "/login") {
    //     navigate("/login");
    //   }
    // }
  }, [authData]);

  return (
    <div className="flex bg-[#FAFAFA] items-center">
      <HomepageMenu className="flex-[1] lg:flex-[60%]" />

      <div className="hidden lg:block lg:flex-[40%] bg-[#F9FAFA] h-full self-center">
        <img src={HomepageBG} alt="Homepage Icon" className="aspect-square bg-contain h-[60vh] mx-auto " />
      </div>
    </div>
  );
};
