export declare module UpdateNonEmployeeData {
  export interface Request {
    member_data_id: number;
    member_data: MemberData;
  }

  export interface MemberData {
    address: string;
    pincode: string;
    nominee_details: NomineeDetails;
  }

  export interface NomineeDetails {
    nominee: string;
    address: string;
    relation: string;
  }
}
