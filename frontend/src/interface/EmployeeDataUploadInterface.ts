export interface EmployeeDataTableInterface {
  grade: string;
  age: string;
  family_definition: string;
  category: string;
  amount: number;
  sum_insured: number;
}

export module EmployeeDataUploadInterface {
  export interface Request {
    file: string;
    master_policy_number: string;
  }
  export interface Response {}
}
