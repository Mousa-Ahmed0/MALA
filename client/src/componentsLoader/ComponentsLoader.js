// ComponentImports.js
import { lazy } from "react";

// LandingPage components
export const LandingPage = lazy(() =>
  import("../pages/LandingPage/LandingPage")
);
//Pages
export const Staff = lazy(() => import("../pages/Staff/Staff"));
export const Doctor = lazy(() => import("../pages/Doctor/Doctor"));
export const Patient = lazy(() => import("../pages/Patient/Patient"));
export const Error = lazy(() => import("../pages/Error/Error"));
//Components
export const Anlysis = lazy(() =>
  import("../components/Anlysis/AnlysisContainer.jsx")
);
export const AnlyiseDetails = lazy(() =>
  import("../components/AnlyiseDetails/AnlyiseDetails")
);

/*=========== Internal Imports ===========*/

// Profile
export const Profile = lazy(() =>
  import("../components/UserComponenet/UserProfile/UserProfileContainer.jsx")
);
export const UserProfilePrsintation = lazy(() =>
  import("../components/UserComponenet/UserProfile/UserProfilePrsintation.jsx")
);

// MessageInterface.jsx
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
