// form
import { useFormContext, Controller } from "react-hook-form";
import React from "react";

// @mui
import { Switch, FormControlLabel, FormHelperText, FormControlLabelProps } from "@mui/material";

// ----------------------------------------------------------------------

interface RHFSwitchInterface extends FormControlLabelProps {
  name: string;
  helperText: React.ReactNode;
}

export default function RHFSwitch({ name, helperText, ...other }: RHFSwitchInterface) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel {...other} control={<Switch {...field} checked={field.value} />} />

          {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
        </div>
      )}
    />
  );
}
