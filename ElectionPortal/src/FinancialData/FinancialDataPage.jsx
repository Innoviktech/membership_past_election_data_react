import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import InitialView from './InitialView';
import './FinancialData.css';
import HeaderNavbar from '../Components/HeaderNavbar';
import url from '../constants/url.jsx';
import RequestFormModal from "./RequestFormModal";

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

const FinancialDataPage = () => {
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [financialData, setFinancialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dataSource, setDataSource] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);


  useEffect(() => {
    if (selectedStateId) {
      setIsLoading(true);
      setFinancialData(null);
      setApiResponse(null);
      setDataSource('');

      const apiUrl = `${url.getFinancialDataByState.url}?state_id=${selectedStateId}`;
      console.log('Fetching data from API:', apiUrl);

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(apiData => {
          console.log('API response:', apiData);
          setApiResponse(apiData);

          if (apiData && apiData.length > 0) {
            const transformedData = transformApiData(apiData);
            transformedData.source = 'api';
            setFinancialData(transformedData);
            setDataSource('api');
          } else {
            setFinancialData(fallbackData);
            setDataSource('fallback');
          }
          setIsLoading(false);
        })
        .catch(() => {
          setFinancialData(fallbackData);
          setDataSource('fallback');
          setIsLoading(false);
        });
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
      sectoral_allocations: fallbackData.sectoral_allocations,
      source: 'api'
    };
  };

  const handleStateChange = ({ state_id, state_name }) => {
    setSelectedStateId(state_id);
    setSelectedStateName(state_name);
  };

  return (
    <div className="financial-data-page-wrapper">
      <HeaderNavbar />
      <div className="financial-data-container">
        <div className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
          <Sidebar
            selectedState={selectedStateId}
            onStateChange={handleStateChange}
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
                  onSubmit={(formData) => {
                    console.log("Form submitted: ", formData);
                  }}
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