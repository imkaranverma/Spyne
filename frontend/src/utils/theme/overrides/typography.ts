import { Palette } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export const typographyOverrides: TypographyOptions | ((palette: Palette) => TypographyOptions) | undefined = {
  fontFamily: ["Plus Jakarta Sans"].join(","),
  fontSize: 14,

  h1: {
    color: "#4B2C71 !important",
    fontSize: "3.5rem",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "120%" /* 4.2rem */
  },
  h2: {
    color: "#4B2C71 !important",
    fontSize: "3rem",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "120%" /* 3.6rem */
  },
  h3: {
    color: "#4B2C71 !important",
    fontSize: "2.25rem",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "120%" /* 2.7rem */
  },
  h4: {
    color: "#4B2C71 !important",
    fontSize: "2rem",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "120%" /* 2.4rem */
  },
  h5: {
    color: "#4B2C71 !important",
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "120%" /* 1.8rem */
  },
  h6: {
    color: "#4B2C71 !important",
    fontSize: "1.125rem",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "120%" /* 1.35rem */
  },
  body1: {
    color: "#4B2C71 !important",
    fontFamily: "Inter",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%" /* 1.5rem */
  },
  body2: {
    color: "#4B2C71 !important",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "157%" /* 1.373rem */
  },
  subtitle1: {
    color: "#4B2C71 !important",
    fontFamily: "Inter",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "157%" /* 1.57rem */
  },
  subtitle2: {
    color: "#4B2C71 !important",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "157%" /* 1.37rem */
  },
  overline: {
    color: "#4B2C71 !important",
    fontFamily: "Inter",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "100%" /* 1.5rem */,
    letterSpacing: "0.03125rem",
    textTransform: "uppercase"
  },
  caption: {
    color: "#4B2C71 !important",
    fontFamily: "Inter",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "166%" /* 1.245rem */
  }
};
