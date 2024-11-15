// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Box, FormControl, FormLabel, StandardTextFieldProps, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider, DesktopDatePicker, DesktopDatePickerProps, TimePicker } from "@mui/x-date-pickers";
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// ----------------------------------------------------------------------

interface RHFDatePickerInterface extends StandardTextFieldProps {
  helperText?: string;
  type: "date" | "time";
  name: string;
  maxDate?: Dayjs | undefined;
  minDate?: Dayjs | undefined;
  isFloating?: boolean;

  maxTime?: Dayjs | undefined;
  minTime?: Dayjs | undefined;
  label: string;
  labelIndex?: string;
}

export default function RHFDatePicker({ name, helperText, multiline, minDate, maxDate, isFloating, ...other }: RHFDatePickerInterface) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ mb: 2, mt: 1 }}>
          {!isFloating && <FormLabel>{other.label}</FormLabel>}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              maxDate={maxDate}
              minDate={minDate}
              format="DD/MM/YYYY"
              {...field}
              className="w-full"
              slotProps={{ textField: { size: "small" } }}

              // renderInput={(params: TextFieldProps) => (
              //   <TextField
              //     variant="outlined"
              //     {...params}
              //     {...field}
              //     error={!!error}
              //     helperText={
              //       error ? (
              //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transitionDuration: "0.5s" }}>
              //           {error?.message}
              //         </motion.div>
              //       ) : (
              //         helperText
              //       )
              //     }
              //     label={isFloating ? other.label : null}
              //   />
              // )}
            />
          </LocalizationProvider>
        </Box>
      )}
    />
  );
}
