import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthSliceInterface, removeAuthData, setAuthData } from "../reducer/slices/authSlice";
import store, { StoreInterface } from "../reducer/reducer";
import { refreshAccessTokenApiHelper } from "src/api/apiHelper";
import { removeUser } from "src/reducer/slices/userSlice";

const AuthGuard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const authData = useSelector<StoreInterface, AuthSliceInterface>((store) => store.authSlice);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const useRefreshToken = () => {
    useEffect(() => {
      if (authData.refresh) {
        refreshAccessTokenApiHelper({ refresh: authData.refresh ?? "" }).then((response) => {
          console.log(response);
          dispatch(setAuthData(response.data));
        });
        const interval = setInterval(
          () => {
            refreshAccessTokenApiHelper({ refresh: authData.refresh ?? "" }).then((response) => {
              console.log(response);

              dispatch(setAuthData(response.data));
            });
          },
          13 * 60 * 1000
        ); // 13 minutes in milliseconds

        return () => {
          clearInterval(interval);
        }; // Clear the interval on component unmount
      }
    }, []);
  };
  useRefreshToken();
  useEffect(() => {
    if (!authData || !authData.access) {
      store.dispatch(removeUser());

      if (location.pathname != "/login") {
        // window.open("/login", "_self");
      }
    }
  }, [authData]);

  return children;
};

export default AuthGuard;
