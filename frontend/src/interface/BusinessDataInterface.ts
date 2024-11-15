export declare module BusinessDataInterface {
  export interface Response {
    result: Result[];
    count: number;
  }

  export interface Result {
    id: number;
    name: string;
    mobile_number: string;
    email_id: string;
    status: number;
    created_at: number;
    type: Type;
    owner: Owner;
    govt_id_data: any[];
    account_details: any[];
    departments: any[];
    logo: any;
  }

  export interface Type {
    id: number;
    name: string;
  }

  export interface Owner {}

  export interface Request {
    parent_business_id: string;
  }
}

export declare module MasterPolicyNumberList {
  export type Response = Root2[];

  export interface Root2 {
    policy_name: any;
    master_policy_number: string;
    policy_start_date: string;
    policy_end_date: string;
    no_of_primary_members: number;
    no_of_lives: number;
    policy_def_type: string;
  }

  export interface Request {
    business_id: string;
  }

  // export interface Response {
  //   result: {
  //     id: number;
  //     name: string;
  //     status: number;
  //   }[];
  //   // count: number;
  // }

  // export interface Result {
  //   id: number;
  //   name: string;
  //   status: number;
  // }
}

export declare module BusinessOnboardingInterface {
  export interface Request {
    name: string;
    mobile_number: string;
    email_id: string;
    type_id: number;
    parent_id: number;
    govt_id_details?: GovtIdDetails;
    account_details?: AccountDetails;
  }

  export interface GovtIdDetails {
    type: string;
    number: string;
    image?: string;
  }

  export interface AccountDetails {
    bank_name: string;
    account_number: string;
    ifsc_code: string;
    bank_branch: string;
    bank_account_holder_name: string;
  }

  export interface Response {
    info: string;
    business_id: number;
    business_name: string;
  }
}
