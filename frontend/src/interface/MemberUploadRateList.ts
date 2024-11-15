export declare module MemberUploadRateListInterface {
  export interface Response {
    result: Result[];
    count: number;
  }

  export interface Result {
    id: number;
    file_name: string;
    business_id: number;
    is_error: boolean;
    master_policy_number: string;
    no_of_success_records?: number;
    no_of_failed_records?: number;
    file_status: string;
    request_file_url?: string;
    success_records_file_url?: string;
    failed_records_file_url?: string;
  }
}
