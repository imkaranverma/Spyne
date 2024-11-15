import { Theme } from "@emotion/react";
import { Components } from "@mui/material";

export const componentsOverrides: Components<Omit<Theme, "components">> | undefined = {
  MuiButtonBase: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.variant === "contained" &&
          ownerState.color === "primary" && {
            backgroundColor: "#393B59",
            color: "#fff",
            borderRadius: "100px"
          })
      })
      // root: {
      //   backgroundColor: "#393B59",
      // },
    }
  },
  MUIDataTableHeadCell: {
    styleOverrides: {
      root: {
        backgroundColor: "#F4F5F8",
        zIndex: 0
      }
    }
  },
  MUIDataTable: {
    styleOverrides: {
      root: {
        borderRadius: "15px"
      }
    }
  },
  // MuiTable: {
  //   styleOverrides: {
  //     root: {
  //       padding: "1rem"
  //     }
  //   }
  // },
  MuiButton: {
    styleOverrides: {
      root: {
        padding: "0.6rem 2.5rem",
        margin: "1rem 0",
        textWrap: "nowrap",
        borderRadius: "15px", // square corners
        textTransform: "none" // removes uppercase transformation
      }
    }
  },
  MuiFormControlLabel: {}
};
