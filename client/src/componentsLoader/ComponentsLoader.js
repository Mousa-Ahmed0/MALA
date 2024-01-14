// ComponentImports.js
import { lazy } from "react";

/*==========================================  Uillities ===========*/
// Header
export const Header = lazy(() => import("../ulitls/Header/Header.jsx"));
// NavBar
export const Navbar = lazy(() => import("../ulitls/Navbar/Navbar.jsx"));

// Main
export const Main = lazy(() => import("../ulitls/Main/Main.jsx"));

// Footer
export const Footer = lazy(() => import("../ulitls/Footer/Footer.jsx"));

/*==========================================  Pages ===========*/
export const LandingPage = lazy(() =>
  import("../pages/LandingPage/LandingPage")
);
export const Staff = lazy(() => import("../pages/Staff/Staff"));
export const Doctor = lazy(() => import("../pages/Doctor/Doctor"));
export const Patient = lazy(() => import("../pages/Patient/Patient"));
export const Error = lazy(() => import("../pages/Error/Error"));
/*==========================================  LandingPage components ===========*/
export const Home = lazy(() =>
  import("../components/LandingPageCompon/Home/Home.jsx")
);
export const About = lazy(() =>
  import("../components/LandingPageCompon/About/About.jsx")
);
export const GuestAnlyses = lazy(() =>
  import("../components/LandingPageCompon/GuestAnlyses/Ganlyses.jsx")
);
export const Contact = lazy(() =>
  import("../components/LandingPageCompon/Contact/Contact.jsx")
);
export const Login = lazy(() =>
  import("../components/LandingPageCompon/Login/Login.jsx")
);
export const ForgotPassword = lazy(() =>
  import(
    "../components/LandingPageCompon/Login/ForgotPassword/ForgotPassword.jsx"
  )
);
export const ResetPasowrd = lazy(() =>
  import(
    "../components/LandingPageCompon/Login/ForgotPassword/ResetPassword.jsx"
  )
);

/*==========================================  StaffPage components ===========*/
// Dashboard
export const DashboardHome = lazy(() =>
  import("../components/Staff/DashboardHome.jsx")
);
/* Dashboard Components */
export const MessageBox = lazy(() =>
  import("../components/Staff/MessagesHandale/MessageBox/MessageBox.jsx")
);
export const PaymentLineChartContainer = lazy(() =>
  import(
    "../components/Staff/Charts/PaymentLineChart/PaymentLineChartContainer.jsx"
  )
);
export const PayLineChart = lazy(() =>
  import(
    "../components/Staff/Charts/PaymentLineChart/PaymentLineChartComponents/PayLineChart.jsx"
  )
);
export const VisitorsLineChartContainer = lazy(() =>
  import(
    "../components/Staff/Charts/VisitorsLineChart/VisitorsLineChartContainer.jsx"
  )
);
export const VisitorsLineChart = lazy(() =>
  import(
    "../components/Staff/Charts/VisitorsLineChart/VisitorsLineChartComponents/VisitorsLineChart.jsx"
  )
);
//---
// Users Handale
export const UsersController = lazy(() =>
  import("../components/Staff/UsersHandale/UsersController.jsx")
);
export const UsersPreview = lazy(() =>
  import(
    "../components/Staff/UsersHandale/UsersHandaleComponenets/UserPreview/UsersPreview.jsx"
  )
);
export const Register = lazy(() =>
  import(
    "../components/Staff/UsersHandale/UsersHandaleComponenets/Register/Register.jsx"
  )
);
//---
// Analysis Handale
export const AnlysisController = lazy(() =>
  import("../components/Staff/AnlysisHandale/AnlysisController.jsx")
);
export const AddAnlyze = lazy(() =>
  import(
    "../components/Staff/AnlysisHandale/AnlysisHandaleComponenets/AddAnlyze.jsx"
  )
);
export const PreviewAnlysis = lazy(() =>
  import(
    "../components/Staff/AnlysisHandale/AnlysisHandaleComponenets/PreviewAnlysis/PreviewAnlysisContainer.jsx"
  )
);
export const PreviewAnlysisPresintation = lazy(() =>
  import(
    "../components/Staff/AnlysisHandale/AnlysisHandaleComponenets/PreviewAnlysis/PreviewAnlysisPresintation.jsx"
  )
);
export const UpdateAnlyze = lazy(() =>
  import(
    "../components/Staff/AnlysisHandale/AnlysisHandaleComponenets/PreviewAnlysis/PreviewAnlysisComponents/UpdateAnlyze.jsx"
  )
);
//---
// Storage Handale
export const StorageController = lazy(() =>
  import("../components/Staff/StorageHandale/StorageController.jsx")
);
export const ItemsPreview = lazy(() =>
  import(
    "../components/Staff/StorageHandale/StorageHandaleComponents/ItemsPreview/ItemsPreviewContainer.jsx"
  )
);
export const ItemsPreviewPresintation = lazy(() =>
  import(
    "../components/Staff/StorageHandale/StorageHandaleComponents/ItemsPreview/ItemsPreviewPresintation.jsx"
  )
);
export const UpdateItem = lazy(() =>
  import(
    "../components/Staff/StorageHandale/StorageHandaleComponents/ItemsPreview/ItemPreviewComponents/UpdateItem.jsx"
  )
);
export const AddItem = lazy(() =>
  import(
    "../components/Staff/StorageHandale/StorageHandaleComponents/AddItem.jsx"
  )
);
//---
// Result Handale
export const ResultsController = lazy(() =>
  import("../components/Staff/ResultsHandale/ResultsController.jsx")
);
export const ResultsPreview = lazy(() =>
  import(
    "../components/Staff/ResultsHandale/ResultsHandaleComponents/ResultsPreview/ReadySamples/ResultsPreviewContainer.jsx"
  )
);
export const ResultsPreviewPresintation = lazy(() =>
  import(
    "../components/Staff/ResultsHandale/ResultsHandaleComponents/ResultsPreview/ReadySamples/ResultsPreviewPresintation.jsx"
  )
);
export const UnpreparedSamples = lazy(() =>
  import(
    "../components/Staff/ResultsHandale/ResultsHandaleComponents/ResultsPreview/UnpreparedSamples/UnpreparedSamplesContainer.jsx"
  )
);
export const UnpreparedSamplesPresintation = lazy(() =>
  import(
    "../components/Staff/ResultsHandale/ResultsHandaleComponents/ResultsPreview/UnpreparedSamples/UnpreparedSamplesPresintation.jsx"
  )
);
export const AddResult = lazy(() =>
  import(
    "../components/Staff/ResultsHandale/ResultsHandaleComponents/AddResult/AddResultContainer.jsx"
  )
);
export const AddResultPresintation = lazy(() =>
  import(
    "../components/Staff/ResultsHandale/ResultsHandaleComponents/AddResult/AddResultPresintation.jsx"
  )
);
export const AnalyzeResult = lazy(() =>
  import(
    "../components/Staff/ResultsHandale/ResultsHandaleComponents/AddResult/AddResultComponents/AnalyzeResult.jsx"
  )
);
export const EditResult = lazy(() =>
  import(
    "../components/Staff/ResultsHandale/ResultsHandaleComponents/EditResult/EditResultContainer.jsx"
  )
);
export const EditResultPresintation = lazy(() =>
  import(
    "../components/Staff/ResultsHandale/ResultsHandaleComponents/EditResult/EditResultPresintation.jsx"
  )
);
//---
// Messages Handale
export const MessageController = lazy(() =>
  import("../components/Staff/MessagesHandale/MessageController.jsx")
);
export const UsersMessages = lazy(() =>
  import("../components/Staff/MessagesHandale/MessagePreview/UsersMessages.jsx")
);
export const GuestsMessages = lazy(() =>
  import(
    "../components/Staff/MessagesHandale/MessagePreview/GuestsMessages.jsx"
  )
);
export const SendEmail = lazy(() =>
  import("../components/Staff/MessagesHandale/MessageComponents/SendEmail.jsx")
);
//---
// Payments Handale
export const PaymentsController = lazy(() =>
  import("../components/Staff/PaymenysHandale/PaymentsController.jsx")
);
export const PaymentsPreviewContainer = lazy(() =>
  import(
    "../components/Staff/PaymenysHandale/PaymentsHandaleComponents/PaymentsPreview/PaymentsPreviewContainer.jsx"
  )
);
export const PaymentsPreviewPresintation = lazy(() =>
  import(
    "../components/Staff/PaymenysHandale/PaymentsHandaleComponents/PaymentsPreview/PaymentsPreviewPresintation.jsx"
  )
);
export const NotPaidResultsContainer = lazy(() =>
  import(
    "../components/Staff/PaymenysHandale/PaymentsHandaleComponents/NotPaidResults/NotPaidResultsContainer.jsx"
  )
);
export const NotPaidResultsPresintation = lazy(() =>
  import(
    "../components/Staff/PaymenysHandale/PaymentsHandaleComponents/NotPaidResults/NotPaidResultsPresintation.jsx"
  )
);
//---
// Ads Handale
export const AdsController = lazy(() =>
  import("../components/Staff/AdsHandale/AdsController.jsx")
);
export const AddNewAdd = lazy(() =>
  import("../components/Staff/AdsHandale/AdsHandaleComponents/AddNewAdd.jsx")
);
export const AdsPreviewContainer = lazy(() =>
  import(
    "../components/Staff/AdsHandale/AdsHandaleComponents/AdsPreview/AdsPreviewContainer.jsx"
  )
);
export const AdsPreviewPresintation = lazy(() =>
  import(
    "../components/Staff/AdsHandale/AdsHandaleComponents/AdsPreview/AdsPreviewPresintation.jsx"
  )
);
/*==========================================  PatientPage components ===========*/
export const PatientHome = lazy(() =>
  import("../components/Patient/PatientHome.jsx")
);
export const HealthCalculators = lazy(() =>
  import(
    "../components/Patient/PatientComponents/HealthCalcs/HealthCalcsController.jsx"
  )
);
export const BMR = lazy(() =>
  import(
    "../components/Patient/PatientComponents/HealthCalcs/HealthCalcsComponenets/BMR.jsx"
  )
);
export const BMI = lazy(() =>
  import(
    "../components/Patient/PatientComponents/HealthCalcs/HealthCalcsComponenets/BMI.jsx"
  )
);
export const BFC = lazy(() =>
  import(
    "../components/Patient/PatientComponents/HealthCalcs/HealthCalcsComponenets/BFC.jsx"
  )
);
export const PatResultsPreviewContainer = lazy(() =>
  import(
    "../components/Patient/PatientComponents/PatResultsPreview/PatResultsPreviewContainer.jsx"
  )
);
export const PatPaymentsPreviewContainer = lazy(() =>
  import(
    "../components/Patient/PatientComponents/PatPaymentsPreview/PatPaymentsPreviewContainer.jsx"
  )
);
/*==========================================  DoctorPage components ===========*/
export const DoctorHome = lazy(() =>
  import("../components/Doctor/DoctorHome.jsx")
);

/*==========================================  Internal Imports ===========*/
// Profile
export const Profile = lazy(() =>
  import("../components/UserComponenet/UserProfile/UserProfileContainer.jsx")
);
export const UserProfilePrsintation = lazy(() =>
  import("../components/UserComponenet/UserProfile/UserProfilePrsintation.jsx")
);

// MessageInterface.jsx
export const MessageInterface = lazy(() =>
  import("../components/UserComponenet/Messenger/MessageInterface.jsx")
);
export const LabMessageInterface = lazy(() =>
  import(
    "../components/UserComponenet/Messenger/UserMessageInterfaceComponents/LabMessageInterface.jsx"
  )
);
export const UsersMessageInterface = lazy(() =>
  import(
    "../components/UserComponenet/Messenger/UserMessageInterfaceComponents/UsersMessageInterface.jsx"
  )
);
export const MessageContainer = lazy(() =>
  import(
    "../components/UserComponenet/Messenger/UserMessageInterfaceComponents/MessagesContainer.jsx"
  )
);

// Result Details
export const ResultDetails = lazy(() =>
  import("../components/ResultDetails/ResultDetails.jsx")
);
export const DetailsInformation = lazy(() =>
  import(
    "../components/ResultDetails/ResultDetailsComponents/DetailsInformation.jsx"
  )
);
export const ReportsHeader = lazy(() =>
  import("../components/ReportsHeader.jsx")
);
export const ResultsTable = lazy(() =>
  import("../components/ResultDetails/ResultDetailsComponents/ResultsTable.jsx")
);

// Ad Details
export const AdDetails = lazy(() =>
  import("../components/UserComponenet/Ads/AdDetails.jsx")
);

// Add A Payment
export const AddAPayment = lazy(() =>
  import(
    "../components/Staff/PaymenysHandale/PaymentsHandaleComponents/AddAPayment.jsx"
  )
);

/*==========================================  For All Imports ===========*/
// Anlysis
export const Anlysis = lazy(() =>
  import("../components/Anlysis/AnlysisContainer.jsx")
);
export const AnlysisPresintation = lazy(() =>
  import("../components/Anlysis/AnlysisPresintation.jsx")
);
// AnlyiseDetails
export const AnlyiseDetails = lazy(() =>
  import("../components/AnlyiseDetails/AnlyiseDetails")
);
// Ads Section
export const AdsSection = lazy(() =>
  import("../components/UserComponenet/Ads/AdsSection.jsx")
);
// User Nav
export const UserDashbordNav = lazy(() =>
  import("../components/UserDashbordNav.jsx")
);

// Dashboard Welcome
export const DashboardWelcome = lazy(() =>
  import("../components/DashboardWelcome.jsx")
);
