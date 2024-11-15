export declare module NewPolicyInterface {
  interface Relatives {
    person: string;
    enabled: boolean;
    minAge: number;
    maxAge: number;
  }
  export interface Request {
    company: string;
    businessType: any;
    name: string;
    phone: number;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    list: Relatives[];
    masterPolicyNumber: number;
    policyStartDate: number;
    policyEndDate: number;
  }

  export interface Response {
    confirm: string;
  }
}

export declare module GetPolicyInterface {
  interface Relatives {
    person: string;
    enabled: boolean;
    minAge: number;
    maxAge: number;
  }
  export interface Response {
    company: string;
    businessType: any;
    name: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    list?: Relatives[];
    masterPolicyNumber: number;
    policyStartDate: number;
    policyEndDate: number;
  }

  export interface Request {
    masterPolicyNumber: string;
  }
}

// export declare module PolicyDefining {
//     interface relatives {
//         person: string;
//         minAge: number;
//         maxAge: number;
//     }
// export interface request {
//  list: relatives;
//  masterPolicyNumber: number;
//  policyStartDate: number;
//  policyEndDate: number;
// }
// }

export declare module CreateNewPolicyInterface {
  export interface OnboardHRInterface {
    name: string;
    email_id: string;
    mobile_number: string;
    user_details: UserDetails;
    business_id: string;

    // businessrole_id: string
  }

  export interface NewPolicyInterface {
    business_id: number;
    policy_def_type: "EMPLOYEE" | "NON-EMPLOYEE";
    master_policy_number: number;
    cut_off_date: string | undefined;
    policy_start_date: string;
    policy_end_date: string;
    no_of_primary_members: number;
    no_of_lives: number;
    group_details: GroupDetail[];
  }

  export interface GroupDetail {
    group_name: string;
    sum_insured: number;
    member_details: MemberDetail[];
  }

  export interface MemberDetail {
    member_type: string;
    member_count: string;
    min_age: string;
    max_age: string;
  }

  export interface UserDetails {
    username: string;
    password: string;
  }
}
