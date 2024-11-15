import { userData } from "../constants/data";
import { dummyDashboardData } from "../dummy/dummyDashboardData";
import { LoginInterface, MeInterface, TableInterface } from "../interface/AuthInterfaces";
import { claimVerificationDetails } from "../interface/ClaimVerificationInterface";
import { DashboardInterface } from "../interface/DashboardInterface";
import { GenericResponse } from "../interface/GenericResponse";
import { apiClient } from "./apiService";
import { apiEndpoints } from "./endpoints";
import { dummyCreditVerification } from "../dummy/dummyCreditVerification";
import { WalletInfo, WalletTableInterface } from "../interface/WalletInterface";
import { walletData } from "../dummy/dummyWalletData";
import { TransactionInterface, AddMoneyInterface } from "../interface/TransactionInterface";
import { transactionData } from "../dummy/dummyTransactionData";
import { CooperatePolicyInterface } from "../interface/CooperatePolicyInterface";
import { CooperatePolicyData } from "../dummy/dummyCooperatePolicyData";

import { BusinessDataInterface, BusinessOnboardingInterface, MasterPolicyNumberList } from "../interface/BusinessDataInterface";
import { dummyBusinessData } from "../dummy/dummyBusinessData";
import { CreateNewPolicyInterface, GetPolicyInterface, NewPolicyInterface } from "../interface/NewPolicy";
import { RateCardTableInterface, RateCardUploadInterface } from "../interface/RateCardInterface";
import { dummyRateCardData } from "../dummy/dummyRateCardData";
import { BusinessDetails } from "src/interface/BusinessDetails";
import { EmployeeDataUploadInterface } from "src/interface/EmployeeDataUploadInterface";
import { employeeListTableInterface } from "src/interface/EmployeeListTable";
import { toast } from "react-toastify";
import { FileUploadInerface } from "src/interface/FileUploadInterface";
import { ToasterService } from "src/services/ToasterService";
import { BusinessTypeInterface } from "src/interface/BusinessType";
import { RecentlyUploadedRateCardInterface } from "src/interface/RecentlyUploadedRateCard";
import { MemberUploadRateListInterface } from "src/interface/MemberUploadRateList";
import { HRDetailsInterface } from "src/interface/HRDetails";
import { DocumentDetailsInterface } from "src/interface/DocumentDetails";
import { RequestConfig } from "src/interface/RequestConfig";
import { LogoutInterface } from "src/interface/Logout";
import { RateCardListInterface } from "src/interface/RateCardList";
import { ConfigInterface } from "src/interface/ConfigInterface";
import { InsurerUserDataInterface } from "src/interface/InsurerUserDataInterface";
import { PunchPolicyInterface } from "src/interface/PunchPolicyInterface";
import { InsurancePaymentInterface } from "src/interface/InsurancePaymentInterface";
import { UpdateNonEmployeeData } from "src/interface/UpdateNonEmployeeData";

export const getLoginWithCredentialsHelper = async (params: LoginInterface.Request) => {
  // return new Promise((resolve, reject) => {
  //   // setTimeout(() => {
  //   //   resolve({
  //   //     status: 200,
  //   //     message: "Succcessfully Logged in using dummy api",
  //   //     data: {
  //   //       refresh: "dfasdfjasldfjds.fj3jr3jkj3lj4kl3j4kl3jj34k3j4lk3.dfasdfdsfjsdflsdal",
  //   //       access: "dsfkasdjflksajdfj.dfalsjfladsjf.dfasjdflkajdsflasj"
  //   //     }
  //   //   });
  //   // }, 2000);
  // });
  return apiClient.post<LoginInterface.Request, GenericResponse<LoginInterface.Response>>(apiEndpoints.login, params);
};

export const refreshAccessTokenApiHelper = async (params: { refresh: string }) => {
  return apiClient.post<{ refresh: string }, GenericResponse<LoginInterface.Response>>(apiEndpoints.refresh, params, {});
};

export const signUpTheMemberhelper = async (params: LoginInterface.Request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Succcessfully signed Up",
        data: {
          refreshToken: "dfasdfjasldfjds.fj3jr3jkj3lj4kl3j4kl3jj34k3j4lk3.dfasdfdsfjsdflsdal",
          accessToken: "dsfkasdjflksajdfj.dfalsjfladsjf.dfasjdflkajdsflasj"
        }
      });
    }, 2000);
  });
  // return apiClient.post<LoginInterface.Request, LoginInterface.Response>(apiEndpoints.login, params);
};

// export const resend2FAHelper = async (params: Resend2FAPayload) => apiClient.post<Resend2FAPayload, LoginInterface.Response>(apiEndpoints.resend_2fa, params);
// export const verify2FAApiHelper = async (params: VerifyOTPBody) => apiClient.post<VerifyOTPBody, LoginInterface.Response>(apiEndpoints.verify, params);
export const getDashboardDataHelper = () =>
  apiClient.get<GenericResponse<DashboardInterface>>({
    path: apiEndpoints.dashboard
  });
export const getMeApiHelper = (): Promise<GenericResponse<MeInterface.Response>> => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Succcessfully Logged in using dummy api",
  //       data: {
  //         user_profile_data: {
  //           id: 1,
  //           name: "Test User",
  //           email_id: "test@gmail.com",
  //           employee_id: "123",
  //           phone_dial_code: null,
  //           phone_mobile_number: null,
  //           businessrole_id: 1,
  //           businessrole_name: "ADMIN"
  //         },
  //         business_data: {
  //           business_id: 2,
  //           business_name: "Liberty",
  //           business_type_name: "Test",
  //           business_mobile_number: "9876543211",
  //           business_email_id: "sama@gmail.com",
  //           department_id: 2,
  //           department_name: "Test Department"
  //         }
  //       }
  //     });
  //   }, 1000);
  // });
  return apiClient.get<GenericResponse<MeInterface.Response>>({
    path: apiEndpoints.me
  });
};

export const getListApiHelper = (): Promise<GenericResponse<TableInterface.Response[]>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Succcess",
        data: userData
      });
    }, 2000);
  });
};
export const getBusinessListingApiHelper = ({ params, config }: { params: {}; config?: RequestConfig }): Promise<GenericResponse<BusinessDataInterface.Response>> => {
  return apiClient.get<GenericResponse<BusinessDataInterface.Response>>({
    path: apiEndpoints.business_details,
    queryParam: params,
    config: config
  });
};
export const getMasterPolicyNumberListHelper = ({ params }: { params: {} }): Promise<GenericResponse<MasterPolicyNumberList.Response>> => {
  return apiClient.get<GenericResponse<MasterPolicyNumberList.Response>>({
    path: apiEndpoints.master_policy_list,
    queryParam: params
  });
};
export const getBusinessTypeListsHelper = (): Promise<GenericResponse<BusinessTypeInterface.Response>> => {
  return apiClient.get<GenericResponse<BusinessTypeInterface.Response>>({
    path: apiEndpoints.business_type
  });
};

// FIXME: why there is no api here!!
export const getRateCardListingApiHelper = ({ params }: { params?: {}; config?: RequestConfig }): Promise<GenericResponse<RateCardTableInterface[]>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Succcess",
        data: []
        // data: dummyRateCardData
      });
    }, 2000);
  });
};
// TODO: Karan
export const getRecentlyUploadedRateCardListingApiHelper = (params: any): Promise<GenericResponse<RecentlyUploadedRateCardInterface.Response>> => {
  console.log(params);
  return apiClient.get<GenericResponse<RecentlyUploadedRateCardInterface.Response>>({
    path: apiEndpoints.recently_uploaded_rate_card,
    queryParam: params
  });
};
export const getMemberUploadedRateCardListHelper = (params: any): Promise<GenericResponse<MemberUploadRateListInterface.Response>> => {
  console.log(params);
  return apiClient.get<GenericResponse<MemberUploadRateListInterface.Response>>({
    path: apiEndpoints.list_member_upload_filed,

    queryParam: params
  });
};

export const getEndrosementUploadedRateCardListHelper = (params: any): Promise<GenericResponse<MemberUploadRateListInterface.Response>> => {
  console.log(params);
  return apiClient.get<GenericResponse<MemberUploadRateListInterface.Response>>({
    path: apiEndpoints.list_endorsement_member_upload_filed,
    queryParam: params
  });
};
export const getRateCradListHelper = (params: any): Promise<GenericResponse<RateCardListInterface.Response>> => {
  console.log(params);
  return apiClient.get<GenericResponse<RateCardListInterface.Response>>({
    path: apiEndpoints.rate_card_list,
    queryParam: params
  });
};
// export const logoutUserHelper = (params: any): Promise<GenericResponse<LogoutInterface.Response>> => {
//   console.log(params);
//   return apiClient.post<LogoutInterface.Request, GenericResponse<LogoutInterface.Response>>({
//     path: apiEndpoints.logout,
//     queryParam: params
//   });
// };

export const logoutUserHelper = async (params: LogoutInterface.Request) => {
  return apiClient.post<LogoutInterface.Request, GenericResponse<LogoutInterface.Response>>(apiEndpoints.logout, params);
};

export const getRecentlyUploadedEmployeeFileListingApiHelper = (params: any): Promise<GenericResponse<any>> => {
  return apiClient.get<any>({
    path: apiEndpoints.recently_uploaded_employee_file_upload,
    queryParam: params
  });
};

export const getDashboardApiHelper = (): Promise<GenericResponse<DashboardInterface>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Succcess",
        data: dummyDashboardData
      });
    }, 2000);
  });
  // return apiClient.get<GenericResponse<MeInterface.Response>>({
  //   path: apiEndpoints.me
  // });
};

export const getClaimDetailsHelper = (): Promise<GenericResponse<claimVerificationDetails>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Success",
        data: dummyCreditVerification
      });
    }, 2000);
  });
};

export const getWalletDataApiHelper = ({ params, config }: { params?: any; config?: RequestConfig }): Promise<GenericResponse<WalletTableInterface[]>> => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Succcess",
  //       data: walletData
  //     });
  //   }, 2000);
  // });
  return apiClient.get<GenericResponse<WalletTableInterface[]>>({
    path: apiEndpoints.wallet_listing,
    queryParam: params,
    config: config
  });
};
export const getTransactionDataApiHelper = ({ params, config }: { params: {}; config?: RequestConfig }): Promise<GenericResponse<TransactionInterface.Response>> => {
  return apiClient.get<GenericResponse<TransactionInterface.Response>>({
    path: apiEndpoints.transaction_listing,
    queryParam: params,
    config: config
  });
};

export const punchPolicyApiHelper = async (params: { file_upload_id: number; master_policy_number: string }) => {
  return apiClient.post<{ file_upload_id: number; master_policy_number: string }, GenericResponse<PunchPolicyInterface.Response>>(`${apiEndpoints.punch_policy}`, { ...params });
  // return apiClient.post<LoginInterface.Request, LoginInterface.Response>(apiEndpoints.login, params);
};

export const endorsePolicyApiHelper = async (params: { file_upload_id: number }) => {
  return apiClient.post<{ file_upload_id: number }, GenericResponse<AddMoneyInterface.Response>>(`${apiEndpoints.hr_uploaded_employees}`, { ...params });
};
export const addMoneyHelper = async (params: AddMoneyInterface.Request) => {
  return apiClient.patch<AddMoneyInterface.Request, GenericResponse<AddMoneyInterface.Response>>(`${apiEndpoints.addMoney}/${params.wallet_id}`, { ...params });
  // return apiClient.post<LoginInterface.Request, LoginInterface.Response>(apiEndpoints.login, params);
};
export const uploadRateCardApiHelper = async (params: RateCardUploadInterface.Request) => {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("master_policy_number", params.master_policy_number);
  formData.append("business_id", params.business_id);
  // formData.append("file_name", file.name);
  // formData.append("file_type", file.type);

  return await apiClient.post<any, GenericResponse<FileUploadInerface.FileUploadResponseInerface>>(apiEndpoints.rate_card_upload, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
      // Authorization: `Bearer ${authData.auth_token}`,
    }
    // onUploadProgress: (progressEvent) => {
    //   if (showUploadProgress) {
    //     if (progressEvent.progress === 1) {
    //       toast.dismiss("upload_file_toast");
    //     }
    //     const progress = progressEvent.progress ?? 0;
    //     if (!toast.isActive("upload_file_toast")) {
    //       toast("Upload in Progress", { progress, toastId: "upload_file_toast", hideProgressBar: false });
    //     } else {
    //       toast.update("upload_file_toast", { render: `Upload in Progress ${(progress * 100).toFixed(2)}%`, progress, hideProgressBar: false });
    //     }
    //   }
    // }
  });
  // return apiClient.post<LoginInterface.Request, LoginInterface.Response>(apiEndpoints.login, params);
};

export const uploadEmployeeDataApiHelper = async (params: EmployeeDataUploadInterface.Request) => {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("master_policy_number", params.master_policy_number);

  // formData.append("file_name", file.name);
  // formData.append("file_type", file.type);

  return await apiClient.post<any, GenericResponse<FileUploadInerface.FileUploadResponseInerface>>(apiEndpoints.upload_employee_data, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
      // Authorization: `Bearer ${authData.auth_token}`,
    }
    // onUploadProgress: (progressEvent) => {
    //   if (showUploadProgress) {
    //     if (progressEvent.progress === 1) {
    //       toast.dismiss("upload_file_toast");
    //     }
    //     const progress = progressEvent.progress ?? 0;
    //     if (!toast.isActive("upload_file_toast")) {
    //       toast("Upload in Progress", { progress, toastId: "upload_file_toast", hideProgressBar: false });
    //     } else {
    //       toast.update("upload_file_toast", { render: `Upload in Progress ${(progress * 100).toFixed(2)}%`, progress, hideProgressBar: false });
    //     }
    //   }
    // }
  });
  // return apiClient.post<LoginInterface.Request, LoginInterface.Response>(apiEndpoints.login, params);
};
export const uploadEndorsementDataApiHelper = async (params: EmployeeDataUploadInterface.Request) => {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("master_policy_number", params.master_policy_number);

  // formData.append("file_name", file.name);
  // formData.append("file_type", file.type);

  return await apiClient.post<any, GenericResponse<FileUploadInerface.FileUploadResponseInerface>>(apiEndpoints.upload_employee_data, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
      // Authorization: `Bearer ${authData.auth_token}`,
    }
    // onUploadProgress: (progressEvent) => {
    //   if (showUploadProgress) {
    //     if (progressEvent.progress === 1) {
    //       toast.dismiss("upload_file_toast");
    //     }
    //     const progress = progressEvent.progress ?? 0;
    //     if (!toast.isActive("upload_file_toast")) {
    //       toast("Upload in Progress", { progress, toastId: "upload_file_toast", hideProgressBar: false });
    //     } else {
    //       toast.update("upload_file_toast", { render: `Upload in Progress ${(progress * 100).toFixed(2)}%`, progress, hideProgressBar: false });
    //     }
    //   }
    // }
  });
  // return apiClient.post<LoginInterface.Request, LoginInterface.Response>(apiEndpoints.login, params);
};

export const uploadEndorsementEmployeeDataApiHelper = async (params: EmployeeDataUploadInterface.Request) => {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("master_policy_number", params.master_policy_number);

  // formData.append("file_name", file.name);
  // formData.append("file_type", file.type);

  return await apiClient.post<any, GenericResponse<FileUploadInerface.FileUploadResponseInerface>>(apiEndpoints.upload_endorsement_employee_data, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
      // Authorization: `Bearer ${authData.auth_token}`,
    }
    // onUploadProgress: (progressEvent) => {
    //   if (showUploadProgress) {
    //     if (progressEvent.progress === 1) {
    //       toast.dismiss("upload_file_toast");
    //     }
    //     const progress = progressEvent.progress ?? 0;
    //     if (!toast.isActive("upload_file_toast")) {
    //       toast("Upload in Progress", { progress, toastId: "upload_file_toast", hideProgressBar: false });
    //     } else {
    //       toast.update("upload_file_toast", { render: `Upload in Progress ${(progress * 100).toFixed(2)}%`, progress, hideProgressBar: false });
    //     }
    //   }
    // }
  });
  // return apiClient.post<LoginInterface.Request, LoginInterface.Response>(apiEndpoints.login, params);
};

export const getSampleRateCardHelper = ({ config }: { config?: RequestConfig }): Promise<GenericResponse<any>> => {
  return apiClient.get<GenericResponse<any>>({
    path: apiEndpoints.rate_card_upload,
    config: config
  });
};
export const getEmployeeDataHelper = ({ params, config }: { params: {}; config?: RequestConfig }): Promise<GenericResponse<any>> => {
  return apiClient.get<GenericResponse<any>>({
    path: apiEndpoints.sample_employee_data,
    config: config,
    queryParam: params
  });
};

export const getCooperatePolicyDataApiHelper = ({ queryParams, config }: { queryParams: any; config?: RequestConfig }): Promise<GenericResponse<CooperatePolicyInterface>> => {
  return apiClient.get<GenericResponse<CooperatePolicyInterface>>({
    path: apiEndpoints.corporatePolicyListing,
    queryParam: queryParams,
    config: config
  });
};
export const getHrUploadedEmployeesListTable = (queryParams: {}): Promise<GenericResponse<CooperatePolicyInterface>> => {
  return apiClient.get<GenericResponse<CooperatePolicyInterface>>({
    path: apiEndpoints.hr_uploaded_employees,
    queryParam: queryParams
  });
};

export const getEmployeeListTableDataHelper = (queryParams: {}): Promise<GenericResponse<employeeListTableInterface.Response>> => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Succcess",
  //       data: CooperatePolicyData
  //     });
  //   }, 2000);
  // });
  return apiClient.get<GenericResponse<employeeListTableInterface.Response>>({
    path: apiEndpoints.employeeListTableData,
    queryParam: queryParams
  });
};

export const onboardHRMutation = async (params: CreateNewPolicyInterface.OnboardHRInterface) => {
  return apiClient.post<CreateNewPolicyInterface.OnboardHRInterface, LoginInterface.Response>(apiEndpoints.onboard_hr, params);
};
export const updateHRApiHelper = async (user_profile_id: number, params: CreateNewPolicyInterface.OnboardHRInterface) => {
  return apiClient.patch<CreateNewPolicyInterface.OnboardHRInterface, LoginInterface.Response>(`${apiEndpoints.onboard_hr}/${user_profile_id}`, params);
};
export const createNewPolicyApiHelper = async (params: CreateNewPolicyInterface.NewPolicyInterface) => {
  return apiClient.post<CreateNewPolicyInterface.NewPolicyInterface, any>(apiEndpoints.create_new_policy, params);
};

export const businessCreationHelper = async (params: BusinessOnboardingInterface.Request) => {
  return apiClient.post<BusinessOnboardingInterface.Request, BusinessOnboardingInterface.Response>(apiEndpoints.business_creation, params);
};

export const businessUpdationHelper = async (params: { id: string; data: Partial<BusinessOnboardingInterface.Request> }) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Customer Succcessfully Created",
  //       data: {
  //         confirm: "DONE!!!!"
  //       }
  //     });
  //   }, 2000);
  // });
  return apiClient.patch<Partial<BusinessOnboardingInterface.Request>, BusinessOnboardingInterface.Response>(`${apiEndpoints.business_creation}/${params.id}`, params.data);
};

export const getPolicyDataApiHelper = async (params: GetPolicyInterface.Request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Field Updated",
        data: {
          company: "ABC",
          businessType: "XYZ",
          name: "Joe Rogan",
          phone: 1726378223,
          email: "random@random.com",
          username: "random@12334",
          password: "1234",
          confirmPassword: "1234",
          list: [
            {
              person: "self",
              enabled: true,
              minAge: 23,
              maxAge: 70
            }
          ],
          masterPolicyNumber: 28712,
          policyStartDate: 2131,
          policyEndDate: 1321231
        }
      });
    }, 0);
  });
  // return apiClient.post<LoginInterface.Request, LoginInterface.Response>(apiEndpoints.login, params);
};

export const getWalletDetailsApiHelper = ({ params }: { params: {} }): Promise<GenericResponse<WalletInfo.Response>> => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Succcess",
  //       data: transactionData
  //     });
  //   }, 2000);
  // });
  return apiClient.get<GenericResponse<WalletInfo.Response>>({
    path: apiEndpoints.wallet_details,
    queryParam: params
  });
};
export const getHRDetailsApiHelper = ({ params }: { params: {} }): Promise<GenericResponse<HRDetailsInterface.Response>> => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Succcess",
  //       data: transactionData
  //     });
  //   }, 2000);
  // });
  return apiClient.get<GenericResponse<HRDetailsInterface.Response>>({
    path: apiEndpoints.hr_details_data,
    queryParam: params
  });
};
export const getDocumentDetailsApiHelper = ({ params }: { params: {} }): Promise<GenericResponse<DocumentDetailsInterface.Response>> => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Succcess",
  //       data: transactionData
  //     });
  //   }, 2000);
  // });
  return apiClient.get<GenericResponse<DocumentDetailsInterface.Response>>({
    path: apiEndpoints.document_details,
    queryParam: params
  });
};

export const getBusinessDetailHelper = ({ params }: { params: {} }): Promise<GenericResponse<BusinessDetails.Response>> => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Succcess",
  //       data: transactionData
  //     });
  //   }, 2000);
  // });
  return apiClient.get<GenericResponse<BusinessDetails.Response>>({
    path: apiEndpoints.business_details,
    queryParam: params
  });
};

// export const getPolicyDataApiHelper = (): Promise<GenericResponse<GetPolicyInterface.Response>> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         status: 200,
//         message: "Succcess",
//         data: {
//           company: "ABC",
//           businessType: "XYZ",
//           name: "Joe Rogan",
//           phone: 1726378223,
//           email: "random@random.com",
//           username: "random@12334",
//           password: "1234",
//           confirmPassword: "1234",
//           list: [
//             {
//               person: "self",
//               enabled: true,
//               minAge: 23,
//               maxAge: 70,
//             }
//           ],
//           masterPolicyNumber: 28712,
//           policyStartDate: 2131,
//           policyEndDate: 1321231,
//         }
//       });
//     }, 2000);
//   });
//   // return apiClient.get<GenericResponse<MeInterface.Response>>({
//   //   path: apiEndpoints.me
//   // });
// };

export const uploadFileToBucket = async ({ showUploadProgress = false, file }: FileUploadInerface.FileUploadRequestInerface) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("file_name", file.name);
    // formData.append("file_type", file.type);

    return await apiClient.post<any, GenericResponse<FileUploadInerface.FileUploadResponseInerface>>(apiEndpoints.file_upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
        // Authorization: `Bearer ${authData.auth_token}`,
      },
      onUploadProgress: (progressEvent) => {
        if (showUploadProgress) {
          if (progressEvent.progress === 1) {
            toast.dismiss("upload_file_toast");
          }
          const progress = progressEvent.progress ?? 0;
          if (!toast.isActive("upload_file_toast")) {
            toast("Upload in Progress", { progress, toastId: "upload_file_toast", hideProgressBar: false });
          } else {
            toast.update("upload_file_toast", { render: `Upload in Progress ${(progress * 100).toFixed(2)}%`, progress, hideProgressBar: false });
          }
        }
      }
    });
  } catch (error) {
    toast.dismiss("upload_file_toast");
    ToasterService.error("Something went wrong.");

    throw error;
  }
};

export const getConfigAPIHelper = () => {
  // return (
  //   new Promise((resolve , reject) => {
  //     setTimeout(() => {
  //      resolve({
  //       status: 200,
  //       message: "success",
  //       data: {
  //         business_id: 1,
  //         business_name: "Liberty General Insurance",
  //         business_logo: "https://www.libertyinsurance.in/images/LGI_Blue_Black.png"
  //         }
  //       })
  //     }, 1000);
  //   })
  // )

  return apiClient.get<GenericResponse<ConfigInterface.Response>>({
    path: apiEndpoints.config_api
  });
};

export const nonEmployeeInsurerApiHelper = async (params: any) => {
  return apiClient.post<any, GenericResponse<InsurancePaymentInterface.Response>>(`${apiEndpoints.create_member_insurance_form_data}`, { ...params });
};

export const nonEmployeeInsurerUpdateApiHelper = async (params: UpdateNonEmployeeData.Request) => {
  return apiClient.post<UpdateNonEmployeeData.Request, GenericResponse<any>>(`${apiEndpoints.update_member_insurance_form_data}`, { ...params });

  // create_member_insurance_form_data

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Success",
  //       data: {
  //         info: "Successfully Uploaded"
  //       }
  //     });
  //   }, 2000);
  // });
};

export const getInsurerDataAPIHelper = ({ params }: { params: InsurerUserDataInterface.Request }) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       message: "Success",
  //       data: {
  //           member_data: {
  //               name: "Member9",
  //               date_of_birth: "2000-01-10",
  //               mobile_number: "9999999999",
  //               email: "anand@finnspire.com"
  //                },
  //           policy_definition: {
  //               id: 1,
  //               business_id: 999,
  //               policy_name: null,
  //               master_policy_number: "999",
  //               no_of_primary_members: 4,
  //               no_of_lives: 5,
  //               policy_start_date: "2024-08-06 00:00:00",
  //               policy_end_date: "2025-08-05 00:00:00",
  //               group_details: [
  //                        {
  //                       group_id: 1,
  //                       group_name: "Group 1",
  //                       sum_insured: 150000,
  //                       member_details: [
  //                                {
  //                               member_type: "SELF",
  //                               min_age: 18,
  //                               max_age: 75,
  //                               member_count: 1
  //                                }
  //                            ]
  //                        }
  //                    ],
  //               cut_off_date: "2024-08-05T00:00:00",
  //               policy_def_type: "NON-EMPLOYEE"
  //                },
  //           payment_details: {
  //               gross_premium: "",
  //               net_premium: "",
  //               payment_url: ""
  //                }
  //            }
  //   }
  //   );
  //   }, 2000);
  // });

  return apiClient.get<GenericResponse<InsurerUserDataInterface.Response>>({
    path: apiEndpoints.list_member_form_data,
    queryParam: params
  });
};
