import { createHashRouter } from "react-router-dom";
import VoterServices from "./Pages/VoterServices";
import ManifestoPromises from "./Pages/ManifestoPromises";
import { useEffect } from "react";
import App from "./App";

// Wrapper component for pages with title
const PageWithTitle = ({ element, title }) => {
  useEffect(() => {
    document.title = title? `Election Portal | ${title}` : 'Election Portal';
  }, [title]);

  return element;
};

const router = createHashRouter([
   {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PageWithTitle element={<VoterServices />} title="Voter Services Home" />
      },
      {
        path: '/voter-services',
        element: <PageWithTitle element={<VoterServices />} title="Voter Services" />
      },
      {
        path: '/manifesto-promises',
        element: <PageWithTitle element={<ManifestoPromises />} title="Manifesto Promises" />
      }
    ]
  }
]);

export default router;