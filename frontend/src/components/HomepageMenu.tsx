import Typography from "@mui/material/Typography";
import { Formheadline } from "./Formheadline";
import { HomepageCard } from "./HomepageCard";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useLoggedInUserData } from "../hooks/customHooks";
import policyLogo from "src/assets/policyIcon.svg";
import certificateLogo from "../assets/certificate.png";
import employeeLogo from "../assets/employee.png";
import businessLogo from "src/assets/businessIcon.svg";
import walletLogo from "src/assets/walletIcon.svg";
import rateCardLogo from "src/assets/rateCardIcon.svg";
import React, { useEffect, useState } from "react";
import { roleMapping } from "src/utils/roleMapping";
export const HomepageMenu = ({ className }: { className: string }) => {
  const { userData } = useLoggedInUserData();
  const [cardList, setcardList] = useState([
    { icon: policyLogo, title: "Define Corporate Policy", to: "policy-listing", enabled: false },
    { icon: businessLogo, title: "Customer Management", to: "business-listing", enabled: false },
    { icon: walletLogo, title: "CD Balance", to: "wallet", enabled: false },
    { icon: rateCardLogo, title: "Rate Card", to: "ratecard", enabled: false },
    { icon: certificateLogo, title: "View Employees Certificate", to: "user-policy-listing", enabled: false }
  ]);

  useEffect(() => {
    if (userData) {
      setcardList(() => [
        { icon: policyLogo, title: "Define Corporate Policy", to: "policy-listing", enabled: roleMapping[userData.user_profile_data.businessrole_name]["policy_listing"] },
        { icon: businessLogo, title: "Customer Management", to: "business-listing", enabled: roleMapping[userData.user_profile_data.businessrole_name]["business_listing"] },
        { icon: walletLogo, title: "CD Balance", to: "wallet", enabled: roleMapping[userData.user_profile_data.businessrole_name]["wallet"] },
        { icon: rateCardLogo, title: "Rate Card", to: "ratecard", enabled: roleMapping[userData.user_profile_data.businessrole_name]["ratecard"] },
        { icon: certificateLogo, title: "Policy Holder Certificates", to: "user-policy-listing", enabled: roleMapping[userData.user_profile_data.businessrole_name]["view_employee"] },
        { icon: employeeLogo, title: "Upload Policy Holder Data", to: "employee-data-upload", enabled: roleMapping[userData.user_profile_data.businessrole_name]["upload_employee"] }
      ]);
    }
  }, [userData?.user_profile_data?.businessrole_name]);

  return (
    <div className={`${className} px-20 py-4 flex flex-col justify-between h-full`}>
      <Typography>Welcome, {userData?.user_profile_data?.name ?? ""}</Typography>
      <div className="p-14">
        <Formheadline title="Menu" />
        <Grid container gridColumn={12} spacing={2}>
          {cardList
            .filter((el) => el.enabled)
            .map((cardItem, index) => (
              <Grid xs={12} sm={"auto"} key={index}>
                <HomepageCard icon={cardItem.icon} title={cardItem.title} goto={cardItem.to} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};
