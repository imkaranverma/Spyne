import FormProvider from "./hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../utils/validationSchema";
import { Link, useNavigate } from "react-router-dom";
import { RHFTextField, RHFCheckbox } from "./hook-form";
import { Button, Typography } from "@mui/material";
import { useSignupAPI } from "../api/apiQuery";
import { ToasterService } from "../services/ToasterService";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export const SignupComponent = ({ className }: { className: string }) => {
  const navigate = useNavigate();
  const signUpMutate = useSignupAPI({
    onSuccess: (response) => {
      ToasterService.success(response.message);
      navigate("/login");
    },
    onError(err) {
      console.log("Error!!!, ", err);
    }
  });

  const methods = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues
  });
  const {
    reset,
    handleSubmit,
    watch
    // formState: { isSubmitting, isDirty, dirtyFields, isValid }
  } = methods;
  const values = watch();
  const onHandleSubmit = (values: FormValues) => {
    console.log(values);

    signUpMutate.mutate({ ...values });
    // loginApiMutate({ ...values, bypass: byPassValue, unique_device_id: btoa(`${window.navigator.userAgent}_${values.email}`) });
  };

  return (
    <div className={`${className} h-100vh`}>
      <div className="flex min-h-full flex-col justify-start px-6 py-12 lg:px-8">
        <Typography variant="h5">Sign up</Typography>
        <Typography variant="body1">Create your Account!</Typography>

        <div className="mt-10 w-full flex justify-start">
          <FormProvider className="w-full" methods={methods} onSubmit={handleSubmit(onHandleSubmit, (err) => console.log(err))}>
            <RHFTextField fullWidth dataId="name" name="name" placeholder="Input your name in here" label="Name" />
            <RHFTextField fullWidth dataId="email" name="email" placeholder="Input your email in here" label="Email ID" />
            <RHFTextField fullWidth dataId="password" name="password" placeholder="Input your password in here" label="Password" type="password" />
            <RHFTextField fullWidth dataId="confirmPassword" name="confirmPassword" placeholder="Input your password in here again" label="Confirm Password" type="password" />
            <div className="flex justify-between items-center flex-wrap"></div>

            <div className="flex justify-between my-4">
              <a className="underline italic cursor-pointer" onClick={() => navigate("/login")}>
                Already have an Account?
              </a>
              <LoadingButton type="submit" variant="contained" disabled={!methods.formState.isValid} loading={signUpMutate.isPending}>
                Sign Up
              </LoadingButton>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

///

// CamelCase firstName
// PascalCase
// SnakeLadderCase first_name
