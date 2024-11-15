// export interface claimVerificationDetails {

export interface customerDetails {
  customerID: string;
  product: string;
  raisingClaim: string;
}

export interface memberDetails {
  name: string;
  mobileNumber: number;
  policyNumber: number;
  utilisedAttendanceDays: number;
  policyStartDate: number;
  policyEndDate: number;
  remainingAttendanceDays: number;
}

export interface nomineeDetails {
  name: string;
  relationship: string;
}

export interface claimVerificationDetails {
  customerDetails: {
    customerID: string;
    product: string;
    raisingClaim: string;
  };

  memberDetails: {
    name: string;
    mobileNumber: number;
    policyNumber: number;
    utilisedAttendanceDays: number;
    policyStartDate: number;
    policyEndDate: number;
    remainingAttendanceDays: number;
  };

  nomineeDetails: {
    name: string;
    relationship: string;
  };
}

// }

// export interface claimVerificationDetails {
//     // customerDetails: {
//     //     label: string;
//     //     value: string;
//     // }[];
//     // customerDetails: {
//     //             customerID: string;
//     //             product: string;
//     //             raisingClaim: string;
//     //         };

//     memberDetails: {
//         label: string;
//         value: string;
//     }[];
//     nomineeDetails: {
//         label: string;
//         value: string;
//     }[];

// }
