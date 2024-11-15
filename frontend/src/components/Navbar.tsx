import { useState } from "react";
import { Avatar, Tooltip, Divider, ListItemIcon, Menu, MenuItem, Button } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { removeAuthData } from "../reducer/slices/authSlice";
import { useDispatch } from "react-redux";
import { removeUser } from "../reducer/slices/userSlice";
import { useAuthData, useConfigData, useLoggedInUserData } from "../hooks/customHooks";
import LOGO from "../assets/libertyIcon/icon.png";
// or w/e

import React from "react";
import { useLogoutUserAPI } from "src/api/apiQuery";
import { usedBusinessConfig } from "src/global_config";

import { persistor } from "src/reducer/reducer";
import { ToasterService } from "src/services/ToasterService";
import { removeConfigData } from "src/reducer/slices/configSlice";
export const Navbar = () => {
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useLoggedInUserData();
  const { authData } = useAuthData();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { configData } = useConfigData();

  const open = Boolean(anchorEl);

  // const logoutHandle = useLogoutUserAPI({
  //   enabled: false,
  //   params: authData?.refresh ?? ""
  // })
  const logoutHandle = useLogoutUserAPI({
    onSuccess: (response) => {
      // console.log(response.data.info);
      ToasterService.success("LOGOUT OUT!!");
      dispatch(removeUser());
      dispatch(removeAuthData());
      dispatch(removeConfigData());
      // navigate("/login")
      // setExpanded("panel2");
      // setOpen(false);
    },
    onError(err) {}
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    // logoutHandle.refetch();
    logoutHandle.mutate({ refresh: authData?.refresh ?? "" });

    // console.log("logoutttt")
  };
  return (
    <>
      <nav className="bg-white flex justify-between items-center px-4 py-1">
        <Link to={"/"}>
          <img src={configData?.business_logo} alt={configData?.business_name} className="aspect-auto bg-contain w-[5rem]" />
        </Link>
        {authData?.access && userData?.user_profile_data?.email_id && (
          <div className="flex items-center">
            <Tooltip title="Account settings">
              <Button variant="text" color="primary" onClick={handleClick} sx={{ padding: 0, color: "#000" }}>
                {`${userData.user_profile_data.name} | ${userData.user_profile_data.businessrole_name}`}
              </Button>
              {/* <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton> */}
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 2,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem> */}
              {/* <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem> */}
              {/* <Divider /> */}

              {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </nav>
    </>
  );
};
