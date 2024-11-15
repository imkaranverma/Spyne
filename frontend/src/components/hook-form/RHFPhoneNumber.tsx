import { Box, FormHelperText, FormLabel, StandardTextFieldProps, TextField } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import React from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { environment } from "src/global_config";
// @mui

// ----------------------------------------------------------------------

interface RHFPhoneNumberFieldInterface extends StandardTextFieldProps {
  name: string;
  helperText?: React.ReactNode;
  multiline?: boolean;
  isFloating?: boolean;
}

export default function RHFPhoneNumberField({ name, isFloating = false, helperText, multiline, ...other }: RHFPhoneNumberFieldInterface) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ mb: 2, mt: 1 }}>
          {!isFloating && <FormLabel>{other.label}</FormLabel>}
          <PhoneInput international placeholder="Enter phone number" {...field} country="US" defaultCountry="US" countries={environment.toLowerCase() === "dev" ? ["IN", "US"] : ["US"]} countryCallingCodeEditable={environment.toLowerCase() === "dev"} withCountryCallingCode error={!!error} label={isFloating ? other.label : null} />
          <FormHelperText sx={{ color: error ? "#d32f2f" : "" }}>
            {error ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transitionDuration: "0.5s" }}>
                {error?.message}
              </motion.div>
            ) : (
              helperText
            )}
          </FormHelperText>
        </Box>
      )}
      {...other}
    />
  );
}
