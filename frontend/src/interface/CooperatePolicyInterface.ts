// export interface CooperatePolicyInterface {
//   id: number;
//   sNo: number;
//   companyName: string;
//   masterPolicyNumber: string;
//   policyStartDate: number;
//   policyEndDate: number;
//   // phoneNumber: number;
//   // emailId: string;
//   status: string;
//   policyCreationDate: number;
// }

// export interface Root {
//   data: Data
// }

export interface CooperatePolicyInterface {
  result: Result[];
  count: number;
}

export interface Result {
  id: number;
  business_id: number;
  policy_name: any;
  master_policy_number: string;
  no_of_primary_members: number;
  no_of_lives: number;
  policy_start_date: string;
  policy_end_date: string;
  group_details: GroupDetail[];
}

export interface GroupDetail {
  "group_name.": string;
  sum_insured: number;
  member_details: MemberDetail[];
}

export interface MemberDetail {
  member_type: string;
  min_age: number;
  max_age: number;
  member_count: number;
}
