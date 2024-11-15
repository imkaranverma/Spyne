// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Box, Chip, Select, Checkbox, MenuItem, TextField, InputLabel, FormControl, OutlinedInput, FormHelperText } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

interface RHFMultiSelectInterface {
  name: string;
  chip?: boolean;
  label: string;
  options: { label: string; value: string }[];
  checkbox?: boolean;
  placeholder: string;
  helperText?: React.ReactNode;
  sx: object;
  multiple?: boolean;
}

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  sx,
  multiple,

  ...other
}: RHFMultiSelectInterface) {
  const { control } = useFormContext();

  // FIXME: Used any here need to fix what sort of data type we are going to use it depends on what backend structure am going to provide
  const renderValues = (selectedIds: any[]) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: "text.disabled" }}>
          {placeholder}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(", ");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx}>
          {label && <InputLabel id={name}> {label} </InputLabel>}

          <Select
            sx={{ minWidth: 150 }}
            {...field}
            multiple={false}
            displayEmpty={!!placeholder}
            labelId={name}
            fullWidth
            input={<OutlinedInput fullWidth label={label} error={!!error} />}
            renderValue={renderValues}
            MenuProps={{
              PaperProps: {
                sx: { px: 1, maxHeight: 280 }
              }
            }}
            {...other}
          >
            {placeholder && (
              <MenuItem
                disabled
                value=""
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 0.75,
                  typography: "body2"
                }}
              >
                <em> {placeholder} </em>
              </MenuItem>
            )}

            {options.map((option) => {
              const selected = field.value.includes(option.value);

              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 0.75,
                    typography: "body2",
                    ...(selected && {
                      fontWeight: "fontWeightMedium"
                    }),
                    ...(checkbox && {
                      p: 0.25
                    })
                  }}
                >
                  {checkbox && <Checkbox disableRipple size="small" checked={selected} />}
                  {option.value}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
