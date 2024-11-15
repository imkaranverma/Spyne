import React, { useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import Typography from "@mui/material/Typography";
import { HorizonalBorder } from "../components/Borders";
import FormProvider from "../components/hook-form/FormProvider";
import Grid from "@mui/material/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useGetBusinessData, useGetmasterPolicyNumberList, useRateCardTableListingData, useRecentlyUploadedRateCardTableListingData, useUploadRateCardAPI } from "../api/apiQuery";
import { ToasterService } from "../services/ToasterService";
import { transactionSchema, uploadRateCardSchema } from "../utils/validationSchema";
import { RHFAutocomplete } from "../components/hook-form";
import Button from "@mui/material/Button";
import UploadBox from "../components/UploadBox";
import { CardLayout } from "../layouts/CardLayout";
import { useLoggedInUserData } from "src/hooks/customHooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { RecentlyUploadedRateCardTable } from "src/components/RecentlyUploadedRateCardTable";
import { useQueryClient } from "@tanstack/react-query";
import { BackButtonBar } from "src/components/BackButton";
import { getSampleRateCardHelper } from "src/api/apiHelper";
import { downloadFile } from "src/utils/utilities";
import { useLocation } from "react-router-dom";

interface DefaultValuesInterface {
  business_info: any;
  master_policy_number: any;
  file: any;
}

const defaultValue: DefaultValuesInterface = {
  business_info: {},
  master_policy_number: {},
  file: undefined
};

export const UploadRateCardPage = () => {
  const queryClient = useQueryClient();

  const location = useLocation();

  const { master_policy_number, business_id, business_name } = location?.state ?? { master_policy_number: undefined, business_id: undefined, business_name: undefined };

  console.log("masterPolicy: ", master_policy_number);
  console.log("business infpo :", business_id, business_name);
  const uploadRateCardMutation = useUploadRateCardAPI({
    onSuccess: (response) => {
      ToasterService.success(response.message);
      //   setOpen(false);
      methods.setValue("file", undefined, { shouldValidate: false });
      recentlyUploadedRateCardQuery.refetch();
    },
    onError(err) {
      console.log(err);
      // ToasterService.success(response.message);
      methods.setValue("file", undefined, { shouldValidate: false });
      recentlyUploadedRateCardQuery.refetch();
      // methods.getValues()
    }
  });

  // const downloadSampleRateCard = useDownloadSampleRateCard({
  //   enabled: true,

  // })
  const { userData } = useLoggedInUserData();
  const methods = useForm({
    resolver: yupResolver<DefaultValuesInterface>(uploadRateCardSchema),
    defaultValues: defaultValue
  });
  const {
    handleSubmit

    // formState: { isSubmitting, isDirty, dirtyFields, isValid }
  } = methods;

  const values = methods.watch();

  const recentlyUploadedRateCardQuery = useRecentlyUploadedRateCardTableListingData({
    enabled: false,
    params: { business_id: values.business_info?.id }
  });

  const onHandleSubmit = (values: any) => {
    uploadRateCardMutation.mutate({ file: values.file, business_id: values.business_info.id, master_policy_number: values.master_policy_number.master_policy_number });
  };
  const businessListingQuery = useGetBusinessData({
    enabled: true,
    params: { parent_business_id: userData?.business_data?.parent_business_id }
  });
  const masterPolicyNumberList = useGetmasterPolicyNumberList({
    enabled: false,
    params: { business_id: values.business_info?.id }
  });

  useEffect(() => {
    console.log("values: ", values);
  }, [values]);

  useEffect(() => {
    if (values.business_info?.id) {
      masterPolicyNumberList.refetch();
      recentlyUploadedRateCardQuery.refetch();
    }
  }, [values.business_info?.id]);

  useEffect(() => {
    console.log("first");
    // methods.setValue("master_policy_number", "");
    if (!values.business_info) methods.resetField("master_policy_number");
    // methods.reset({'master_policy_number':undefined})
    // methods.setValue('master_policy_number',undefined)
    console.log(values);
  }, [values.business_info]);

  useEffect(() => {
    if (master_policy_number) {
      methods.setValue("master_policy_number", { master_policy_number: master_policy_number });
    }

    if (business_id && business_name) {
      methods.setValue("business_info", {
        id: business_id,
        name: business_name
      });
    }

    methods.getValues();
  }, [master_policy_number, business_id, business_name]);

  return (
    <MainLayout>
      <BackButtonBar label="Rate Card Upload" />
      <CardLayout title="Rate Card upload">
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onHandleSubmit, (err) => {
            console.log(err);
          })}
        >
          <Grid container gridColumn={12} spacing={1} justifyContent={"space-between"} alignItems={"center"} sx={{ marginBottom: "2rem" }}>
            <Grid item sm={6}>
              <RHFAutocomplete
                label="Select Customer"
                key="business_info"
                name="business_info"
                placeholder="Select Customer"
                options={[...(businessListingQuery.data?.data?.result ?? [])]}
                multiple={false}
                // onChange={(event, newValue: any) => {
                //   // if (newValue.business_id === "new") {
                //   //   navigate("/business", { state: { redirectBack: true } });
                //   // } else {
                //     methods.setValue<any>("business_info", newValue, { shouldValidate: true, shouldDirty: false, shouldTouch: true });
                //   // }
                // }}
                {...{
                  loading: businessListingQuery.isLoading,
                  fullWidth: true,
                  getOptionLabel: (option: any) => option?.name ?? "",
                  sx: { mb: 2 },
                  isOptionEqualToValue: (option: any, value: any) => option.id === value.id
                }}
              />
            </Grid>
            <Grid item sm={6}>
              <RHFAutocomplete
                label="Select Master Policy Number"
                key="master_policy_number"
                name="master_policy_number"
                // options={masterPolicyNumberList.data?.data?.result ?? []}
                options={[...(masterPolicyNumberList.data?.data ?? [])]}
                multiple={false}
                {...{
                  disabled: !values.business_info,
                  loading: masterPolicyNumberList.isLoading,
                  fullWidth: true,
                  getOptionLabel: (option: any) => option?.master_policy_number ?? "",
                  sx: { mb: 2 },
                  isOptionEqualToValue: (option: any, value: any) => option.master_policy_number === value.master_policy_number
                }}
              />
            </Grid>

            <Grid item sm={12} justifySelf={"right"} textAlign={"right"}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  getSampleRateCardHelper({
                    config: {
                      responseType: "blob"
                    }
                  }).then((response: any) => {
                    downloadFile(response, `Sample_Ratecard.${response.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "xlsx" : "pdf"}`, response.type);
                  });
                  return false;
                }}
              >
                Download sample file
              </Button>
            </Grid>
            <Grid item sm={12}>
              <UploadBox
                previewMode
                multiple={false}
                maxFiles={1}
                files={values.file ? [values.file] : []}
                handleFileSubmission={(files) => {
                  methods.setValue("file", files[0], { shouldValidate: false, shouldDirty: false, shouldTouch: true });
                }}
              />
            </Grid>
          </Grid>
          <div className="flex justify-center">
            <LoadingButton
              // disabled={!methods.formState.isValid}
              loading={uploadRateCardMutation.isPending}
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#D87821", color: "#fff" }}
            >
              Upload
            </LoadingButton>
          </div>
        </FormProvider>
      </CardLayout>

      {values?.business_info?.id && <RecentlyUploadedRateCardTable recentlyUploadedRateCardTableQuery={recentlyUploadedRateCardQuery} />}
    </MainLayout>
  );
};
