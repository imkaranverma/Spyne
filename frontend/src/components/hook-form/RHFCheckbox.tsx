// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Checkbox, FormLabel, FormGroup, FormControl, FormHelperText, FormControlLabel, FormControlLabelProps } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

interface RHFCheckboxInterface {
  name: string;
  helperText?: React.ReactNode;
  label: string;
}

export function RHFCheckbox({
  name,
  helperText,

  ...other
}: RHFCheckboxInterface) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <div>
          <FormControlLabel {...other} control={<Checkbox {...field} checked={field.value} />} />

          {((Boolean(error) && isTouched) || helperText) && <FormHelperText error={Boolean(error) && isTouched}>{error ? error?.message : helperText}</FormHelperText>}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFMultiCheckboxInterface {
  row: boolean;
  name: string;
  label: string;
  options: { label: string; value: string }[];
  spacing: number;
  helperText: React.ReactNode;
}

export function RHFMultiCheckbox({ row, name, label, options, spacing, helperText, ...other }: RHFMultiCheckboxInterface) {
  const { control } = useFormContext();

  const getSelected = (selectedItems: string[], item: string) => (selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" sx={{ typography: "body2" }}>
              {label}
            </FormLabel>
          )}

          <FormGroup
            sx={{
              ...(row && {
                flexDirection: "row"
              }),
              "& .MuiFormControlLabel-root": {
                "&:not(:last-of-type)": {
                  mb: spacing || 0
                },
                ...(row && {
                  mr: 0,
                  "&:not(:last-of-type)": {
                    mr: spacing || 2
                  }
                })
              }
            }}
          >
            {options.map((option) => (
              <FormControlLabel key={option.value} control={<Checkbox checked={field.value.includes(option.value)} onChange={() => field.onChange(getSelected(field.value, option.value))} />} label={option.label} {...other} />
            ))}
          </FormGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
