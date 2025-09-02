import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DataDashboard from './DataDashboard';
import InitialView from './InitialView';
import './FinancialData.css';
import HeaderNavbar from '../Components/HeaderNavbar';
import url from '../constants/url.jsx'; // Adjust the path to where your url.jsx is located

// Fallback data (same as before)
const fallbackData = {
  budget_at_glance: [
    { sno: 1, classification: 'Total Revenue Receipts', accounts_23_24: '2,64,597', revised_24_25: '2,93,906', budget_25_26: '3,31,569' },
    // ... rest of your fallback data
  ],
  // ... rest of your fallback data
  source: 'fallback'
};

const FinancialDataPage = () => {
  const [selectedState, setSelectedState] = useState('');
  const [financialData, setFinancialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    if (selectedState) {
      setIsLoading(true);
      setFinancialData(null);
      setError(null);
      setDataSource('');
      setApiResponse(null);
      
      // Map state names to state IDs
      const stateIdMap = {
        'Tamil Nadu': 1,
        // Add other states as needed
      };
      
      const stateId = stateIdMap[selectedState];
      
      if (!stateId) {
        setError('State not found in mapping');
        setIsLoading(false);
        return;
      }
      
      // Use the URL from your centralized configuration
      const apiUrl = `${url.getFinancialDataByState.url}?state_id=${stateId}`;
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
          
          // Check if API returned valid data (not all zeros)
          const hasValidData = apiData && apiData.length > 0 && apiData.some(item => 
            item['2023_2024_Accounts'] !== '₹0.00 Cr' ||
            item['2024_2025_Revised_Estimate'] !== '₹0.00 Cr' ||
            item['2025_2026_Budget_Estimate'] !== '₹0.00 Cr'
          );
          
          if (hasValidData) {
            const transformedData = transformApiData(apiData);
            transformedData.source = 'api';
            setFinancialData(transformedData);
            setDataSource('api');
            console.log('Using API data');
          } else {
            setFinancialData(fallbackData);
            setDataSource('fallback');
            console.log('Using fallback data (API returned zeros)');
          }
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching financial data:', error);
          setFinancialData(fallbackData);
          setDataSource('fallback');
          setIsLoading(false);
          console.log('Using fallback data (API error)');
        });
    }
  }, [selectedState]);

  // transformApiData function remains the same
  const transformApiData = (apiData) => {
    const budgetAtGlance = apiData.map((item, index) => ({
      sno: index + 1,
      classification: item.classification,
      accounts_23_24: item['2023_2024_Accounts'],
      revised_24_25: item['2024_2025_Revised_Estimate'],
      budget_25_26: item['2025_2026_Budget_Estimate']
    }));
    
    return {
      budget_at_glance: budgetAtGlance,
      major_schemes: fallbackData.major_schemes,
      sectoral_allocations: fallbackData.sectoral_allocations,
      source: 'api'
    };
  };

  return (
    <div className="financial-data-page-wrapper">
      <HeaderNavbar />
      <div className="financial-data-container">
        
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
          <Sidebar
            selectedState={selectedState}
            onStateChange={setSelectedState}
          />
        </div>

        {/* Toggle Button */}
        <button
          className={`sidebar-toggle-btn ${isSidebarOpen ? 'open' : ''}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? '<' : '>'}
        </button>

        {/* Content */}
        <main className="content-area">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : financialData ? (
            <>
              {dataSource === 'fallback' && (
                <div className="data-warning">
                  <p><strong>Note:</strong> Currently showing sample data because the API returned all zero values.</p>
                  <p><strong>API URL:</strong> {url.getFinancialDataByState.url}?state_id=1</p>
                  <p><strong>API Response:</strong> {apiResponse ? JSON.stringify(apiResponse) : 'No response received'}</p>
                </div>
              )}
              {dataSource === 'api' && (
                <div className="data-success">
                  <p><strong>Success:</strong> Data loaded from API: {url.getFinancialDataByState.url}?state_id=1</p>
                </div>
              )}
              <DataDashboard data={financialData} />
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