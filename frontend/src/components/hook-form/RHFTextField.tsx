// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Box, FormLabel, InputAdornment, StandardTextFieldProps, TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";
import { NumericFormat, NumericFormatProps } from "react-number-format";

// ----------------------------------------------------------------------

interface RHFTextFieldInterface extends StandardTextFieldProps {
  name: string;
  helperText?: React.ReactNode;
  dataId?: string;
  isFloating?: boolean;
  enablePriceFormatting?: boolean;
  customVariant?: "standard" | "outlined";
}

export default function RHFTextField({ dataId, enablePriceFormatting = false, name, isFloating = false, helperText, customVariant = "outlined", ...other }: RHFTextFieldInterface) {
  const { control } = useFormContext();
  const [isPassword, setIsPassword] = useState<boolean>(other.type === "password" || other.type === "confirm_password");
  // console.log("type: ", other.type, "bool : ", isPassword);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <Box sx={{ mb: 2, mt: 1 }}>
          {!isFloating && <FormLabel>{other.label}</FormLabel>}
          <TextField
            size="small"
            data-testid={dataId}
            sx={{
              // backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                background: "#fff"
              }
            }}
            {...field}
            InputProps={{
              inputComponent: enablePriceFormatting ? (NumericFormatCustom as any) : undefined,
              // startAdornment: <InputAdornment position="start">{/* <Visibility onClick={() => {}} /> */}</InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  {other.type === "password" ? (
                    <Visibility
                      className="cursor-pointer"
                      onClick={() => {
                        setIsPassword(!isPassword);
                      }}
                      // onMouseDown={() => {
                      //   setIsPassword(false);
                      // }}
                      // onMouseUp={() => {
                      //   setIsPassword(true);
                      // }}
                      // onTouchStart={() => {
                      //   setIsPassword(false);
                      // }}
                      // onTouchCancel={() => {
                      //   setIsPassword(true);
                      // }}
                    />
                  ) : null}
                </InputAdornment>
              )
            }}
            variant={customVariant}
            fullWidth
            value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
            error={!!error}
            helperText={
              error ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transitionDuration: "0.5s" }}>
                  {error?.message}
                </motion.div>
              ) : (
                helperText
              )
            }
            {...other}
            label={isFloating ? other.label : null}
            // eslint-disable-next-line no-nested-ternary
            type={isPassword ? "password" : !isPassword && (other.type === "password" || other.type === "confirm_password") ? "text" : (other?.type ?? "text")}
          />
        </Box>
      )}
    />
  );
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="₹"
    />
  );
});
