export declare module HRDetailsInterface {
  export interface Response {
    business_data: BusinessData;
    result: Result[];
  }

  export interface BusinessData {
    business_id: number;
    business_name: string;
    business_type_id: number;
    business_type_name: string;
    business_mobile_number: string;
    business_email_id: string;
    department_id: number;
    department_name: string;
  }

  export interface Result {
    user_profile_data: UserProfileData;
    user_data: UserData;
  }

  export interface UserProfileData {
    id: number;
    name: string;
    mobile_number: string;
    email_id: string;
    employee_id: string;
    businessrole_id: number;
    businessrole_name: string;
  }

  export interface UserData {
    user_id: number;
    user_username: string;
  }
}
