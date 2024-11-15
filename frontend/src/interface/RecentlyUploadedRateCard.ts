export declare module RecentlyUploadedRateCardInterface {
  export interface Response {
    result: Result[];
    count: number;
  }

  export interface Result {
    id: number;
    status: number;
    business_id: number;
    business_name: string;
    file_name: string;
    master_policy_number: string;
    is_error: boolean;
    is_populated: boolean;
    file_status: string;
    created_at: number;
    created_by: number;
    success_records_file_url: string;
    failed_records_file_url: any;
  }
}
