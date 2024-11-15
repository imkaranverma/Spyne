import * as React from "react";

// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Radio, FormLabel, RadioGroup, FormControl, FormHelperText, FormControlLabel } from "@mui/material";
import { RadioProps } from "@mui/material/Radio";
// import { CheckIcon } from "src/assets";
// import { useResponsive } from "src/hooks/responsiveHook";

// ----------------------------------------------------------------------

interface RHFCustomRadioGroupInterface {
  row?: boolean;
  name: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  spacing?: number;

  helperText?: React.ReactNode;
  showCheckIcon?: boolean;
  customStyling?: (selected: boolean) => string;
}

export default function RHFCustomRadioGroup({
  row = true,
  name,
  label,
  options,
  spacing,
  showCheckIcon,
  customStyling,
  helperText,

  ...other
}: RHFCustomRadioGroupInterface) {
  const { control } = useFormContext();
  // const { isMd } = useResponsive();

  const labelledby = label ? `${name}-${label}` : "";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" id={labelledby} sx={{ typography: "body2" }}>
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio disableRipple disableFocusRipple disableTouchRipple />}
                label={option.label}
                sx={{
                  "&:not(:last-of-type)": {
                    mb: spacing || 0
                  },
                  ...(row && {
                    mr: 0,
                    "&:not(:last-of-type)": {
                      mr: spacing || 2
                    }
                  })
                }}
              />
            ))}
          </RadioGroup>

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
