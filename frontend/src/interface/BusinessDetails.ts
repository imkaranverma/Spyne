export declare module BusinessDetails {
  export interface Request {
    business_id: string;
  }
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
    govt_id_details: GovtIdDetail[];
    account_details: any[];
    departments: any[];
    wallet_id: number;
    logo: any;
  }

  export interface Type {
    id: number;
    name: string;
  }

  export interface Owner {}

  export interface GovtIdDetail {
    id: number;
    type: string;
    number: string;
    image: string;
  }
}
