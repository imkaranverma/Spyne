// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Autocomplete, AutocompleteProps, Box, FormLabel, TextField } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

// ----------------------------------------------------------------------

interface RHFAutocompleteInterface {
  name: string;
  onChange?: (event: any, newValue: any) => void;
  label: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  multiple: false | undefined;
  options: any[];
  isFloating?: boolean;
  variant?: "standard" | "outlined";
}

export default function RHFAutocomplete({ name, onChange, placeholder, label, multiple, isFloating = false, helperText, variant = "standard", options, ...other }: RHFAutocompleteInterface) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <Box sx={{ mb: 2, mt: 1 }}>
          {!isFloating && <FormLabel>{label}</FormLabel>}
          <Autocomplete
            options={options}
            {...field}
            multiple={multiple ?? false}
            onChange={(event, newValue) => {
              if (onChange) {
                onChange(event, newValue);
                return;
              }
              setValue(name, newValue, { shouldValidate: true });
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  // backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    background: "#fff"
                  }
                }}
                // variant={variant}
                label={isFloating ? label : null}
                error={Boolean(error)}
                helperText={
                  error ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transitionDuration: "0.5s" }}>
                      {error?.message}
                    </motion.div>
                  ) : (
                    helperText
                  )
                }
                {...params}
                placeholder={placeholder}
                size="small"
              />
            )}
            {...other}
          />
        </Box>
      )}
    />
  );
}
