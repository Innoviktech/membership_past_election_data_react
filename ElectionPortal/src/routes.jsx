import { createHashRouter } from "react-router-dom";
import VoterServices from "./Pages/VoterServices";
import ManifestoPromises from "./Pages/ManifestoPromises";
import { useEffect } from "react";
import App from "./App";
import { useTranslation } from '../src/Components/LanguageSwitch/useTranslation';

// Wrapper component for pages with title
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
      }
    ]
  }
]);

export default router;