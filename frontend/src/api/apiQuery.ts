import { useMutation, useQuery } from "@tanstack/react-query";
import * as ApiHelperMethods from "./apiHelper";
import { GenericResponse } from "../interface/GenericResponse";
import { LoginInterface, MeInterface, TableInterface } from "../interface/AuthInterfaces";
import { DashboardInterface } from "../interface/DashboardInterface";

export const useLoginAPI = ({ onSuccess, onError, onMutate }: { onMutate?: () => void; onSuccess?: (data: GenericResponse<LoginInterface.Response>) => void; onError?: (err: any) => void }) => {
  const mutation = useMutation<any, any, LoginInterface.Request>({
    mutationKey: ["update_member_status"],
    mutationFn: (data) => ApiHelperMethods.getLoginWithCredentialsHelper(data),
    onSuccess,
    onError,
    onMutate,

    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: "get_Broker_Data" });
    }
  });
  return mutation;
};

export const useSignupAPI = ({ onSuccess, onError, onMutate }: { onMutate?: () => void; onSuccess?: (data: GenericResponse<LoginInterface.Response>) => void; onError?: (err: any) => void }) => {
  const mutation = useMutation<any, any, LoginInterface.Request>({
    mutationKey: ["signup_a_member"],
    mutationFn: (data) => ApiHelperMethods.signUpTheMemberhelper(data),
    onSuccess,
    onError,
    onMutate,
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: "get_Broker_Data" });
    }
  });
  return mutation;
};

export const useMeAPI = ({ enabled }: { enabled: boolean }) => {
  const query = useQuery<GenericResponse<MeInterface.Response>, any>({
    queryKey: ["get_me_query"],
    queryFn: (data) => ApiHelperMethods.getMeApiHelper(),
    enabled: enabled
  });
  return query;
};

export const useGetListAPI = ({ enabled }: { enabled: boolean }) => {
  const query = useQuery<GenericResponse<TableInterface.Response[]>, any>({
    queryKey: ["get_table_query"],
    queryFn: (data) => ApiHelperMethods.getListApiHelper(),
    enabled: enabled
  });
  return query;
};

export const useGetDashboardData = ({ enabled }: { enabled: boolean }) => {
  const query = useQuery<GenericResponse<DashboardInterface>, any>({
    queryKey: ["get_dashboard_query"],
    queryFn: (data) => ApiHelperMethods.getDashboardApiHelper(),
    enabled: enabled
  });
  return query;
};

