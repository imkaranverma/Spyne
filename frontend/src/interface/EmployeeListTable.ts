export declare module employeeListTableInterface {
  export interface Response {
    data_count: number;
    result: Result[];
  }

  export interface Result {
    id: number;
    status: number;
    created_by: number;
    created_at: string;
    modified_by: any;
    modified_at: string;
    email: string;
    mobile_number: any;
    date_of_birth: string;
    joining_date: any;
    leaving_date: any;
    sum_insured: number;
    family_id: string;
    member_id: string;
    member_name: string;
    employee_code: string;
    member_type: string;
    policy_issued: boolean;
    pa_cover_opted: boolean;
    pincode: number;
    nominee_details: NomineeDetails;
    account_details: any;
    monthly_income: number;
    group_id: number;
    pregnancy_months: any;
    address: string;
    gender: string;
    file_dump_id: any;
    policy_number: any;
    policy_status: string;
    occupation: string;
    risk_category: any;
    marital_status: string;
    designation_grade: any;
    pre_existing_disease: string;
    non_employee_initial_data_id: number;
    member_wise_premium: MemberWisePremium;
  }

  export interface NomineeDetails {
    nominee_name: string;
    nominee_address: string;
    nominee_relationship: NomineeRelationship | string;
  }

  export interface NomineeRelationship {
    label: string;
    value: string;
  }
  export interface MemberWisePremium {
    member_id: number;
    gross_premium: number;
    net_premium: number;
    transaction_id: string;
    transaction_type: string;
  }

  export interface Request {
    master_policy_number: number;
    member_data_id?: string;
  }
}
