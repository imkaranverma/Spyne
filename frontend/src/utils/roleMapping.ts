export const roleMapping: { [key in "HR" | "ADMIN" | "OPERATIONS"]: any } = {
  HR: {
    policy_listing: false,
    business_listing: false,

    ratecard: false,
    policy: false,
    view_employee: true,
    upload_employee: true,
    wallet: true
  },
  ADMIN: {
    policy_listing: true,
    business_listing: true,
    wallet: true,
    ratecard: true,
    policy: true,
    view_employee: true,
    upload_employee: true
  },
  OPERATIONS: {
    policy_listing: true,
    business_listing: true,
    wallet: true,
    ratecard: true,
    policy: true,
    view_employee: true,
    upload_employee: true
  }
};
