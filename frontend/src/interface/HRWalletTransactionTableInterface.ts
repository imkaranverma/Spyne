export interface HRWalletTableInterface {
  user_profile_id: number;
  business_id: number;
  business_name: string;
  wallet_number: string;
  amount: number;
  currency: string;
  status: number;
  created_at: string;
  wallet_id: number;
}

// export module HRWalletInfo {
//     export interface Request {
//       wallet_id: number;
//     }
//     export interface Response {
//       wallet_id: number;
//       wallet_number: string;
//       balance: number;
//       wallet_currency: string;
//       wallet_user_profile_data: WalletUserProfileData;
//     }

//     export interface WalletUserProfileData {
//       id: number;
//       name: string;
//       mobile_number: string;
//       email_id: string;
//       businessrole_id: number;
//       businessrole_name: string;
//       business_id: number;
//       business_name: string;
//     }
//   }
