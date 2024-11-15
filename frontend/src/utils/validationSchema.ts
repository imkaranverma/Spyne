import dayjs, { Dayjs } from "dayjs";
import * as Yup from "yup";
import { mixed } from "yup";
import { isObjectEmpty } from "./utilities";
import { SevenK } from "@mui/icons-material";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  remember_me: Yup.boolean().default(false)
});

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Your Passwords must match")
    .required("Confirm Password is required")
});

export const memberSelectSchema = Yup.object().shape({
  memberName: Yup.string().required("Select a Member Name")
});

export const sendSMSSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  comment: Yup.string().required("Comment is Required")
});

export const sendEmailSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is Required"),
  comment: Yup.string().required("Comment is Required")
});
export const pushbackSchema = Yup.object().shape({
  reason: Yup.string().required("Select a Reason"),
  remark: Yup.string()
});

export const transactionSchema = Yup.object().shape({
  company: Yup.string().required("Select a Reason"),
  amount: Yup.number().min(1).required("Amount is required"),
  payment_type: Yup.string().required("Payment type is required"),
  payment_reference_number: Yup.string().when("payment_type", {
    is: "CASH", // alternatively: (val) => val == true
    then: (schema) => schema.notRequired().nullable(),
    otherwise: (schema) => schema.required("UTR is required")
  }),
  wallet_id: Yup.string().required("")
});
export const uploadRateCardSchema = Yup.object().shape({
  business_info: Yup.mixed<any | undefined>().required("Select a Customer"),
  master_policy_number: Yup.mixed<any | undefined>().required("Required"),
  file: Yup.mixed<any | undefined>().required()
});
export const uploadEmployeeDataSchema = Yup.object().shape({
  file: Yup.mixed<any | undefined>().required(),
  master_policy_number: Yup.mixed<any | undefined>(),
  business_info: Yup.mixed<any>()
});

export const newPolicySchema = Yup.object().shape({
  business_info: Yup.mixed<any>().required("Customer Name is required"),
  policy_def_type: Yup.mixed<any>().required("Policy Type is required"),
  group_details: Yup.array().of(
    Yup.object().shape({
      group_name: Yup.string().required("Group name is required"),
      sum_insured: Yup.string().required("Sum insured is required"),
      member_details: Yup.array()
        .of(
          Yup.object().shape({
            member_type: Yup.string(),
            member_count: Yup.string(),
            min_age: Yup.number(),
            max_age: Yup.number().max(100, "Maximum Age should be 100")
          })
        )
        .min(1, "Minimum 1 member is required")
    })
  ),

  no_of_primary_members: Yup.number().required(),
  no_of_lives: Yup.number().required(),
  cut_off_date: Yup.mixed<any>().when("policy_def_type", {
    is: (val: any) => val.value === "EMPLOYEE",
    // console.log("valid: ",  val === "EMPLOYEE")
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("Policy Cutoff Date is required")
  }),
  masterPolicyNumber: Yup.string().required("Required"),
  policyStartDate: Yup.mixed<Dayjs>().required("Required"),
  policyEndDate: Yup.mixed<Dayjs>().required("Required")
});

export const hrOnboardingSchema = Yup.object().shape({
  business_info: Yup.mixed<any>().required("Customer Name is required"),
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Required")
    .matches(/^[6-9]\d{9}$/, "Invalid phone number"),

  // phone: Yup.number().min(1000000000, "Phone number must be 10 Digits").max(9999999999, "Phone number must be 10 Digits").required(),
  email: Yup.string().email().required("Email Id is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Your Passwords must match")
    .required("Confirm Password is required")
});
export const hrUpdateOnboardingSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Required")
    .matches(/^[6-9]\d{9}$/, "Invalid phone number"),

  // phone: Yup.number().min(1000000000, "Phone number must be 10 Digits").max(9999999999, "Phone number must be 10 Digits").required(),
  email: Yup.string().email().required("Email Id is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), undefined], "Your Passwords must match")
});

export const businessCreationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile_number: Yup.string()
    .required("Required")
    .matches(/^[6-9]\d{9}$/, "Invalid phone number")
    .required("Mobile Number is required"),
  email_id: Yup.string().email().required("Email Id is required"),
  type_id: Yup.mixed().required("Field is required"),
  logo: Yup.mixed(),

  govt_id_details: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Filed is required"),
      number: Yup.string().when("image", (image, schema) => {
        // console.log(image[0]);
        // console.log("VALIDATINO", !isObjectEmpty(image[0]));
        if (!isObjectEmpty(image[0])) return schema.required("Field is required");
        return schema;
      }),
      image: Yup.mixed()
    })
  )
});

export const businessUpdationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile_number: Yup.string()
    .required("Required")
    .matches(/^[6-9]\d{9}$/, "Invalid phone number")
    .required("Mobile Number is required"),
  email_id: Yup.string().email().required("Email Id is required"),
  logo: Yup.mixed<any>(),
  status: Yup.mixed<any>()

  // govt_id_details: Yup.array().of(
  //   Yup.object().shape({
  //     type: Yup.string().required("Filed is required"),
  //     number: Yup.string().when("image", (image, schema) => {
  //       console.log(image[0]);
  //       console.log("VALIDATINO", !isObjectEmpty(image[0]));
  //       if (!isObjectEmpty(image[0])) return schema.required("Field is required");
  //       return schema;
  //     }),
  //     image: Yup.mixed()
  //   })
  // )
});

export const nonEmployeeInsuranceSchema = Yup.object().shape({
  unique_id: Yup.string(),
  self: Yup.object().shape({
    member_name: Yup.string().required("Member name is required"),
    email: Yup.string().email("Must be a valid email").required("Email is required"),
    date_of_birth: Yup.mixed<any>().required("Date of birth is required"),
    sum_insured: Yup.mixed<any>().nullable(),
    third_party_unique_id: Yup.string().nullable(),
    member_type: Yup.string(),
    gender: Yup.mixed<any>().required("Gender is required"),
    marital_status: Yup.mixed<any>().required("Marital status is required"),
    occupation: Yup.string().required("Occupation is required"),
    monthly_income: Yup.string().required("Income is required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string().required("Pincode is required").length(6),
    pre_existing_disease: Yup.string().required("This field is required"),
    nominee_details: Yup.object().shape({
      nominee_name: Yup.string().required("Nominee name is required"),
      nominee_relationship: Yup.mixed<any>().required("Nominee relationship is required"),
      nominee_address: Yup.string().required("Nominee address is required")
    }),
    pa_cover_opted: Yup.mixed<any>().required("PA Cover is required")
  }),
  //   const selfMember = memberData.find(member => member.member_type === "SELF");

  //   // If self's marital status is "UN-MARRIED"
  //   if (selfMember && selfMember.marital_status === "UN-MARRIED") {
  //     console.log("self member" , selfMember , selfMember.marital_status)
  //     return schema.of(
  //       Yup.object().shape({
  //         member_type: Yup.string().required(),
  //         // All fields for SPOUSE should be not required when SELF is unmarried
  //         member_name: Yup.string().when('member_type', {
  //           is: 'SPOUSE',
  //           then:(schema:any) => schema.notRequired().nullable(),
  //           otherwise: (schema) =>  schema.required("Member name is required"),
  //         }),
  //         // email: Yup.string().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: Yup.string().nullable(),
  //         //   otherwise: Yup.string().email("Must be a valid email").required("Email is required"),
  //         // }),
  //         // date_of_birth: Yup.mixed().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: Yup.mixed().nullable(),
  //         //   otherwise: Yup.mixed().required("Date of birth is required"),
  //         // }),
  //         // gender: Yup.mixed().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: Yup.mixed().nullable(),
  //         //   otherwise: Yup.mixed().required("Gender is required"),
  //         // }),
  //         // marital_status: Yup.mixed().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: Yup.mixed().nullable(),
  //         //   // otherwise: Yup.mixed().required("Marital status is required"),
  //         // }),
  //         // occupation: Yup.string().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: (schema:any) => schema.notRequired().nullable(),
  //         //   otherwise: (schema) =>  schema.required("Occupation is required"),
  //         // }),
  //         // monthly_income: Yup.string().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: Yup.string().nullable(),
  //         //   otherwise: Yup.string().required("Monthly income is required"),
  //         // }),
  //         // address: Yup.string().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: Yup.string().nullable(),
  //         //   otherwise: Yup.string().required("Address is required"),
  //         // }),
  //         // pincode: Yup.string().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: Yup.string().nullable(),
  //         //   otherwise: Yup.string().required("Pincode is required"),
  //         // }),
  //         // details_of_disease: Yup.string().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: Yup.string().nullable(),
  //         //   otherwise: Yup.string().nullable(),
  //         // }),
  //         // nominee_details: Yup.object().shape({
  //         //   nominee_name: Yup.string().when('member_type', {
  //         //     is: 'SPOUSE',
  //         //     then: Yup.string().nullable(),
  //         //     otherwise: Yup.string().required("Nominee name is required"),
  //         //   }),
  //         //   nominee_relationship: Yup.mixed().when('member_type', {
  //         //     is: 'SPOUSE',
  //         //     then: Yup.mixed().nullable(),
  //         //     otherwise: Yup.mixed().required("Nominee relationship is required"),
  //         //   }),
  //         //   nominee_address: Yup.string().when('member_type', {
  //         //     is: 'SPOUSE',
  //         //     then: Yup.string().nullable(),
  //         //     otherwise: Yup.string().required("Nominee address is required"),
  //         //   }),
  //         // }),
  //         // pa_cover_opted: Yup.mixed().when('member_type', {
  //         //   is: 'SPOUSE',
  //         //   then: Yup.mixed().nullable(),
  //         //   otherwise: Yup.mixed().required("PA Cover is required"),
  //         // }),
  //       })
  //     );
  //   }

  //   // Return the original schema for married cases
  //   return schema;
  // })
  // .required("Member data is required"),

  // .test(
  //   "marital-status-test",
  //   "Spouse information should not be provided if self is unmarried",
  //   function (memberData) {
  //     const selfMember = memberData?.find(
  //       (member) => member.member_type === "SELF"
  //     );

  //     // Check if marital status of SELF is "UN-MARRIED"
  //     if (selfMember && selfMember.marital_status === "UN-MARRIED") {
  //       // Ensure the array only has 1 member, which is SELF
  //       return (
  //         memberData?.length === 1 &&
  //         memberData[0].member_type === "SELF"
  //       );
  //     }

  //     return true; // Allow other cases
  //   }
  // )
  // .required("Member data is required"),

  // })
  // self: Yup.object().shape({
  //   // business_info: Yup.string().required("This field is required"),
  //   // master_policy_number: Yup.string().required("This field is required"),
  //   fullname: Yup.string().required("This field is required"),
  //   email: Yup.string().email("Must be valid").required("This field is required"),
  //   // age: Yup.mixed<any>().required("This field is required"),
  //   date_of_birth: Yup.mixed<any>().required("This field is required"),
  //   gender: Yup.mixed<any>().required("This field is required"),
  //   // member_type: Yup.mixed<any>().required("This field is required"),
  //   marital_status: Yup.mixed<any>().required("This field is required"),
  //   // earning: Yup.mixed<any>().required("This field is required"),
  //   monthly_income: Yup.string().when("earning", {
  //     is: (value: any) => value?.label === "No" && value?.value === "no", // alternatively: (val) => val == true
  //     then: (schema) => schema.notRequired().nullable(),
  //     otherwise: (schema) => schema.required("Monthly Income is required")
  //   }),
  //   // sum_insured: Yup.string().when("earning", {
  //   //   is: (value: any) => value?.label === "No" && value?.value === "no", // alternatively: (val) => val == true
  //   //   then: (schema) => schema.notRequired().nullable(),
  //   //   otherwise: (schema) => schema.required("Monthly Income is required")
  //   // }),
  //   occupation_profession: Yup.string().required("This field is required"),
  //   // risk_category: Yup.mixed<any>().required("This field is required"),
  //   // group_id: Yup.mixed<any>().required("This field is required"),
  //   // joining_date: Yup.mixed<any>().required("This field is required"),
  //   // date_of_leaving: Yup.mixed<any>().required("This field is required"),
  //   // employee_code: Yup.string().required("This field is required"),
  //   any_preexisting_disease: Yup.mixed<any>().required("This field is required"),
  //   details_of_disease: Yup.string().when("any_preexisting_disease", {
  //     is: (value: any) => value?.label === "No" && value?.value === "no", // alternatively: (val) => val == true
  //     then: (schema) => schema.notRequired().nullable(),
  //     otherwise: (schema) => schema.required("Details is required")
  //   }),
  //   // whether_pregnant: Yup.mixed<any>().required("This field is required"),
  //   // number_of_month_pregnancy: Yup.string().when("whether_pregnant", {
  //   //   is: (value: any) => value?.label === "No" && value?.value === "no", // alternatively: (val) => val == true
  //   //   then: (schema) => schema.notRequired().nullable(),
  //   //   otherwise: (schema) => schema.required("Months is required")
  //   // }),
  //   // pregnancy_months: Yup.number().max(9, "Max limit is 9"),
  //   location: Yup.string().required("This field is required"),
  //   address: Yup.string().required("This field is required"),
  //   // address2: Yup.string().required("This field is required"),
  //   // address3: Yup.string().required("This field is required"),
  //   city_town: Yup.string().required("This field is required"),
  //   district: Yup.string().required("This field is required"),
  //   state: Yup.string().required("This field is required"),
  //   area: Yup.string().required("This field is required"),
  //   pincode: Yup.string().required("This field is required"),
  //   nominee_details: Yup.object().shape({
  //     nominee_name: Yup.string().required("This field is required"),
  //     nominee_relationship: Yup.mixed<any>().required("This field is required"),
  //     nominee_address: Yup.string().required("This field is required")
  //     // })
  //   }),
  //   // account_details : Yup.object().shape({
  //   //   account_type: Yup.mixed<any>().required("This field is required"),
  //   //   bank_name: Yup.string().required("This field is required"),
  //   //   branch_name: Yup.string().required("This field is required"),
  //   //   account_number: Yup.string().required("This field is required"),
  //   //   ifsc_code: Yup.string().required("This field is required"),
  //   //   micr_code: Yup.string().required("This field is required"),
  //   // }),

  //   pa_covered_required: Yup.mixed<any>().required("This field is required"),
  //   other_remarks: Yup.string().required("This field is required")
  // }),
  spouse: Yup.object().when("self.marital_status.id", {
    is: "MARRIED",
    then: (schema) =>
      schema.shape({
        member_name: Yup.string().required("Member name is required"),
        email: Yup.string().email("Must be a valid email").required("Email is required"),
        date_of_birth: Yup.mixed<any>().required("Date of birth is required"),
        sum_insured: Yup.mixed<any>().required("Sum insured is required"),
        third_party_unique_id: Yup.string().required(),
        member_type: Yup.string().required("Mmeber Type is required"),
        gender: Yup.mixed<any>().required("Gender is required"),
        marital_status: Yup.mixed<any>().required("Marital status is required"),
        occupation: Yup.string().required("Occupation is required"),
        monthly_income: Yup.string().required("Income is required"),
        address: Yup.string().required("Address is required"),
        pincode: Yup.string().required("Pincode is required").length(6),
        pre_existing_disease: Yup.string().required("This field is required"),
        nominee_details: Yup.object().shape({
          nominee_name: Yup.string().required("Nominee name is required"),
          nominee_relationship: Yup.mixed<any>().required("Nominee relationship is required"),
          nominee_address: Yup.string().required("Nominee address is required")
        }),
        pa_cover_opted: Yup.mixed<any>().required("PA Cover is required")
      }),
    otherwise: (schema) => schema.notRequired().nullable()
  })
});

export const nonEmployeeListingInsuranceSchema = Yup.object().shape({
  unique_id: Yup.string(),
  self: Yup.object().shape({
    member_name: Yup.string(),
    email: Yup.string().email("Must be a valid email"),
    date_of_birth: Yup.mixed<any>(),
    sum_insured: Yup.mixed<any>(),
    third_party_unique_id: Yup.string(),
    member_type: Yup.string(),
    gender: Yup.mixed<any>(),
    marital_status: Yup.mixed<any>(),
    occupation: Yup.string(),
    monthly_income: Yup.string(),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string().required("Pincode is required").length(6),
    pre_existing_disease: Yup.string(),
    nominee_details: Yup.object().shape({
      nominee_name: Yup.string().required("Nominee name is required"),
      nominee_relationship: Yup.mixed<any>().required("Nominee relationship is required"),
      nominee_address: Yup.string().required("Nominee address is required")
    }),
    pa_cover_opted: Yup.mixed<any>()
  }),
  spouse: Yup.object().shape({
    member_name: Yup.string(),
    email: Yup.string().email("Must be a valid email"),
    date_of_birth: Yup.mixed<any>(),
    sum_insured: Yup.mixed<any>().nullable(),
    third_party_unique_id: Yup.string().nullable(),
    member_type: Yup.string(),
    gender: Yup.mixed<any>(),
    marital_status: Yup.mixed<any>(),
    occupation: Yup.string(),
    monthly_income: Yup.string(),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string().required("Pincode is required").length(6),
    pre_existing_disease: Yup.string(),
    nominee_details: Yup.object().shape({
      nominee_name: Yup.string().required("Nominee name is required"),
      nominee_relationship: Yup.mixed<any>().required("Nominee relationship is required"),
      nominee_address: Yup.string().required("Nominee address is required")
    }),
    pa_cover_opted: Yup.mixed<any>()
  })
});
