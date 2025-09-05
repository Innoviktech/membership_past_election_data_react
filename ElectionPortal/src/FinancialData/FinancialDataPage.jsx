import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import InitialView from './InitialView';
import './FinancialData.css';
import HeaderNavbar from '../Components/HeaderNavbar';
import url from '../constants/url.jsx';
import RequestFormModal from './RequestFormModal';

const fallbackData = {
  budget_at_glance: [],
  major_schemes: [],
  sectoral_allocations: [],
  source: 'fallback'
};

const BudgetTable = ({ data }) => {
  if (!data || !data.budget_at_glance) return null;

  return (
    <table className="budget-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Classification</th>
          <th>Accounts 2023-24</th>
          <th>Revised 2024-25</th>
          <th>Budget 2025-26</th>
        </tr>
      </thead>
      <tbody>
        {data.budget_at_glance.map((row) => (
          <tr key={row.sno}>
            <td>{row.sno}</td>
            <td>{row.classification}</td>
            <td>{row.accounts_23_24}</td>
            <td>{row.revised_24_25}</td>
            <td>{row.budget_25_26}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TrackedRequestDetails = ({ details }) => {
  if (!details) return null;

  return (
    <div className="tracked-request-details">
      <h2> Request Details</h2>
      <ul>
        <li><strong>Name:</strong> {details.name}</li>
        <li><strong>Mobile:</strong> {details.mobile}</li>
        <li><strong>Email:</strong> {details.email}</li>
        <li><strong>Message:</strong> {details.description}</li>
        <li><strong>Status:</strong> {details.status}</li>
        <li><strong>State:</strong> {details.state_name}</li>
        <li><strong>Request ID:</strong> {details.request_id}</li>
      </ul>
    </div>
  );
};

const FinancialDataPage = () => {
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [financialData, setFinancialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dataSource, setDataSource] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [trackedRequest, setTrackedRequest] = useState(null); 
  useEffect(() => {
    if (selectedStateId) {
      setIsLoading(true);
      setTrackedRequest(null); 
      setFinancialData(null);
      setDataSource('');

      const apiUrl = `${url.getFinancialDataByState.url}?state_id=${selectedStateId}`;
      fetch(apiUrl)
        .then(res => res.json())
        .then(apiData => {
          if (apiData && apiData.length > 0) {
            const transformed = transformApiData(apiData);
            transformed.source = 'api';
            setFinancialData(transformed);
            setDataSource('api');
          } else {
            setFinancialData(fallbackData);
            setDataSource('fallback');
          }
        })
        .catch(() => {
          setFinancialData(fallbackData);
          setDataSource('fallback');
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedStateId]);

  const transformApiData = (apiData) => {
    const budgetAtGlance = apiData.map((item, index) => ({
      sno: index + 1,
      classification: item.classification || 'N/A',
      accounts_23_24: item['2023_2024_Accounts'] || 'N/A',
      revised_24_25: item['2024_2025_Revised_Estimate'] || 'N/A',
      budget_25_26: item['2025_2026_Budget_Estimate'] || 'N/A'
    }));

    return {
      budget_at_glance: budgetAtGlance,
      major_schemes: fallbackData.major_schemes,
      sectoral_allocations: fallbackData.sectoral_allocations
    };
  };

  const handleStateChange = ({ state_id, state_name }) => {
    setSelectedStateId(state_id);
    setSelectedStateName(state_name);
  };

  const handleTrackRequest = async (trackingId) => {
    if (!trackingId) return;

    try {
      const response = await fetch(`${url.getrequestdetails.url}?request_id=${trackingId}`);
      const data = await response.json();

      if (response.ok && data?.data?.length) {
        const row = data.data[0]; 
        const requestDetails = {
          name: row[0],
          mobile: row[1],
          email: row[2],
          description: row[3],
          status: row[4],
          request_id: row[5],
          state_name: row[6]
        };
        setTrackedRequest(requestDetails); 
        setFinancialData(null); 
      } else {
        alert("Tracking ID not found.");
        setTrackedRequest(null);
      }
    } catch (err) {
      alert("Failed to track request.");
    }
  };

  return (
    <div className="financial-data-page-wrapper">
      <HeaderNavbar />
      <div className="financial-data-container">
        <div className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
          <Sidebar
            selectedState={selectedStateId}
            onStateChange={handleStateChange}
            onTrackData={setTrackedRequest} 
          />
        </div>

        <button
          className={`sidebar-toggle-btn ${isSidebarOpen ? 'open' : ''}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? '<' : '>'}
        </button>

        <main className="content-area">
          {isLoading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <div className="loading-text">LOADING...</div>
            </div>
          ) : trackedRequest ? (
            <TrackedRequestDetails details={trackedRequest} /> 
          ) : financialData ? (
            <>
              {dataSource === 'fallback' ? (
                <div className="data-warning-modern">
                  <div className="icon">⚠️</div>
                  <div className="text-content">
                    <h2>Financial Data Not Available</h2>
                    <p>
                      Sorry! We currently don't have financial data for <strong>{selectedStateName}</strong>.
                      If you'd like us to prioritize this data, please submit a request.
                    </p>
                    <button
                      className="modern-request-btn"
                      onClick={() => setIsRequestModalOpen(true)}
                    >
                      📄 Request Data for {selectedStateName}
                    </button>
                  </div>
                  <RequestFormModal
                    isOpen={isRequestModalOpen}
                    onClose={() => setIsRequestModalOpen(false)}
                    stateId={selectedStateId}
                    stateName={selectedStateName}
                  />
                </div>
              ) : (
                <BudgetTable data={financialData} />
              )}
            </>
          ) : (
            <InitialView />
          )}
        </main>
      </div>
    </div>
  );
};

export default FinancialDataPage;
