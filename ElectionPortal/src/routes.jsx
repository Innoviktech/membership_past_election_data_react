import { createHashRouter } from "react-router-dom";
import VoterServices from "./Pages/VoterServices";
import ManifestoPromises from "./Pages/ManifestoPromises";
import { useEffect } from "react";
import App from "./App";
import { useTranslation } from '../src/Components/LanguageSwitch/useTranslation';

// Import existing page components
import FinancialDataPage from "./FinancialData/FinancialDataPage";
// 1. IMPORT THE NEW API DEMO PAGE



// Wrapper component for pages with title (no changes here)
const PageWithTitle = ({ element, titleKey }) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    const appName = t('NAVBAR.AppName');
    const pageTitle = titleKey ? t(titleKey) : 'Election Portal';
    document.title = titleKey ? `${appName} | ${pageTitle}` : appName;
  }, [titleKey, t]);

  return element;
};

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PageWithTitle element={<VoterServices />} titleKey="NAVBAR.Home" />
      },
      {
        path: '/voter-services',
        element: <PageWithTitle element={<VoterServices />} titleKey="NAVBAR.Home" />
      },
      {
        path: '/manifesto-promises',
        element: <PageWithTitle element={<ManifestoPromises />} titleKey="NAVBAR.ManifestoPromises" />
      },
      {
        path: '/financial-data',
        element: <PageWithTitle element={<FinancialDataPage />} titleKey="NAVBAR.FinancialData" />
      },
      // 2. ADD THE NEW ROUTE FOR THE API DEMO PAGE HERE
      
    ]
  }
]);

export default router;
