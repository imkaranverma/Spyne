import { StringUnitLength } from "luxon";

export declare module MeInterface {
  // export interface Response {
  //   id: number;
  //   name: string;
  //   email: string;
  //   user_type: "hr" | "admin";
  //   is_verified: boolean;
  // }
  export interface Response {
    user_profile_data: UserProfileData;
    business_data: BusinessDataInterface;
  }

  export interface BusinessDataInterface {
    // business_id: number;
    // business_name: string;
    parent_business_id: number;
    parent_business_name: string;
    business_type_name: string;
    business_mobile_number: string;
    business_email_id: string;
    department_id: number;
    department_name: string;
  }

  export interface UserProfileData {
    id: number;
    name: string;
    email_id: string;
    employee_id: string;
    phone_dial_code: any;
    phone_mobile_number: any;
    businessrole_id: number;
    businessrole_name: "HR" | "ADMIN" | "OPERATIONS";
  }
}

export declare module TableInterface {
  export interface Response {
    sno: number;
    customerName: string;
    gender: string;
    customerID: string;
    insurer: string;
    DOB: string;
    loanID: string;
    caseID: string;
    loanAmount: number;
    actualDeathDate: number;
    claimSentToInsurerDate: number;
    settlementDate: number;
    claimAmount: number;
    status: string;
  }
}

export declare module LoginInterface {
  export interface Request {
    email: string;
    password: string;
  }
  export interface Response {
    access: string;
    refresh: string;
    user_id: string;
  }
}
