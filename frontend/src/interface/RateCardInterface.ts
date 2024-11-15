export interface RateCardTableInterface {
  grade: string;
  age: string;
  family_definition: string;
  category: string;
  amount: number;
  sum_insured: number;
}

export module RateCardUploadInterface {
  export interface Request {
    master_policy_number: string;
    business_id: string;
    file: string;
  }
  export interface Response {}
}
