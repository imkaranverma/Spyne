// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Slider, FormHelperText } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

interface RHFSliderInterface {
  name: string;
  helperText: React.ReactNode;
}

export default function RHFSlider({ name, helperText, ...other }: RHFSliderInterface) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Slider {...field} valueLabelDisplay="auto" {...other} />

          {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
        </div>
      )}
    />
  );
}
