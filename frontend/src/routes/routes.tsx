import React from "react";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Page404 } from "../pages/Page404";
import { Page401 } from "../pages/Page401";
import { RouteErrorHandler } from "../components/RouteErrorHandler";
import AuthGuard from "../components/AuthGuard";
import { LoginPage } from "../pages/LoginPage";
import { ClaimSummaryVerificationPage } from "../pages/ClaimSummaryVerificationPage";
import { Navbar } from "../components/Navbar";
import { DashboardPage } from "../pages/DashboardPage";
import { SignupPage } from "../pages/SignupPage";
import { Footer } from "../components/Footer";
import { ClaimsSummaryPage } from "../pages/ClaimSummaryPage";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/HomePage";
import { WalletPage } from "../pages/WalletPage";
import { TransactionTable } from "../components/TransactionTable";
import { TransactionPage } from "../pages/TransactionPage";
import { CooperatePolicy } from "../pages/CorporatePolicyListing";
import { BusinessPage } from "../pages/BusinessPage";
import { BusinessCreationPage } from "../pages/BusinessCreationPage";
import { NewPolicy } from "../pages/NewPolicy";
import { RateCardPage } from "../pages/RateCardPage";
import { UploadRateCardPage } from "../pages/UploadRateCardPage";
import { BusinessDetailsPage } from "../pages/BusinessDetails";
import { UserPolicyListing } from "src/pages/UserPolicyListing";
import { EmployeeDataUploadPage } from "src/pages/EmployeeDataUploadPage";
import { EmployeeDataListingPage } from "src/pages/EmployeeDataListingPage";
import SideNavBar from "src/components/SideNavbar";
import { NonEmployerFormPage } from "src/pages/NonEmployerFormPage";
// import { PaymentSuccess } from "src/pages/PaymentSuccess";
import { AfterPayment } from "src/pages/AfterPaymentPage";

// import { FinancialPerformancePage1 } from "src/pages/FinancialPerformance/NewFPPage";

interface RouteInterface {
  path: string;
  index?: boolean;
  element: React.ReactNode;
  errorElement?: React.ReactNode;
  children?: RouteInterface[];
}

export const MyRouter = () => {
  //   const { userData, userRole } = useLoggedInUserData();

  //   const roleBasedNavigationMapping = useMemo(() => getRoleBasedUIMapping({ userData }), [userData]);

  const router = createBrowserRouter([
    {
      path: "/",

      errorElement: <ErrorPage />,
      element: (
        <AuthGuard>
          <SideNavBar>
            <Outlet />
            <Footer />
          </SideNavBar>
        </AuthGuard>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "policy-listing", index: false, element: <CooperatePolicy /> },
        { path: "user-policy-listing", index: false, element: <UserPolicyListing /> },
        { path: "employee-data-upload", index: false, element: <EmployeeDataUploadPage /> },
        { path: "employee-listing", index: false, element: <EmployeeDataListingPage /> },

        { path: "policy/newpolicy/:master_policy_num?", index: false, element: <NewPolicy /> },
        { path: "business-listing", index: false, element: <BusinessPage /> },
        { path: "business/:id?", index: false, element: <BusinessCreationPage /> },
        { path: "customer-details/:business_id/:wallet_id", index: false, element: <BusinessDetailsPage /> },
        { path: "wallet", index: false, element: <WalletPage /> },
        { path: "transaction/:value", index: false, element: <TransactionPage /> },
        { path: "ratecard", index: false, element: <RateCardPage /> },
        { path: "ratecard/upload", index: false, element: <UploadRateCardPage /> }

        // { path: "non-employee", index: false, element: <NonEmployerFormPage /> }
        // { path: "payment_gateway", index: false, element: <PaymentGatewayPage /> }
        // { path: "policy/customer-details/:name", index: false, element: <BusinessDetails /> },
      ]
    },
    { path: "after-payment", index: false, element: <AfterPayment /> },
    { path: "non-employee/:unique_id?", index: false, element: <NonEmployerFormPage /> },
    { path: "login", index: false, element: <LoginPage /> },
    { path: "signup", index: false, element: <SignupPage /> },
    // { path: "onboarding/reset-password", index: false, element: <ResetPasswordPage /> },

    // { path: "onboarding/verify-details", index: false, element: <VerifyDetailsPage /> },

    // { path: "/2fa-auth", index: false, element: <TwoFAPage /> },

    // { path: "/forgot_password_successfull", index: false, element: <ForgotPasswordSuccess /> },

    // { path: "forgot-password", index: false, element: <ForgotPasswordPage /> },
    { path: "unauthorized", index: false, element: <Page401 /> },

    { path: "*", index: false, element: <Page404 /> }
  ]);

  return <RouterProvider router={router} />;
};

// TODO: Based on user role navigate to default route
// export const navigateToDefaultRoute = ({ response, navigate, navigateOptions }: { response: any; navigate: NavigateFunction; navigateOptions?: NavigateOptions }) => {

// };
