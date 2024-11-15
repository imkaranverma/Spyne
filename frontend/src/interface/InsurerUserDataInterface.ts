export declare module InsurerUserDataInterface {
  export interface Request {
    unique_id: string;
  }

  export interface Response {
    member_data: MemberData;
    policy_definition: PolicyDefinition;
    payment_details: PaymentDetails;
  }

  export interface MemberData {
    name: string;
    date_of_birth: string;
    mobile_number: string;
    email: string;
    third_party_unique_id: string;
    existing_member_data: any[];
  }

  export interface PolicyDefinition {
    id: number;
    business_id: number;
    policy_name: any;
    master_policy_number: string;
    no_of_primary_members: number;
    no_of_lives: number;
    policy_start_date: string;
    policy_end_date: string;
    group_details: GroupDetail[];
    cut_off_date: string;
    policy_def_type: string;
  }

  export interface GroupDetail {
    group_id: number;
    group_name: string;
    sum_insured: number;
    member_details: MemberDetail[];
  }

  export interface MemberDetail {
    member_type: string;
    min_age: number;
    max_age: number;
    member_count: number;
  }

  export interface PaymentDetails {
    gross_premium: string;
    net_premium: string;
    payment_url: string;
  }
}
