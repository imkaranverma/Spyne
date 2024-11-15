import React from "react";
import sidebg from "../assets/main-bg.jpg";
import { LoginForm } from "../components/LoginForm";
import { Navbar } from "../components/Navbar";
import LoginIcon from "../assets/loginImage.svg";

export const LoginPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex h-[70vh] z-0 bg-[#F9FAFA]">
        <LoginForm className="flex-[1] md:flex-[45%] " />

        <div className="  md:flex-[55%] bg-[#F9FAFA] h-full ">
          <img src={LoginIcon} alt="" className="aspect-square bg-contain h-[90vh] px-[5rem]" />
        </div>
      </div>
    </>
  );
};
