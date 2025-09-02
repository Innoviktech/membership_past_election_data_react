import React from 'react';
// Note: For charts to work, you would need to install a library like Chart.js
// npm install chart.js react-chartjs-2
import { FaBook, FaBuilding, FaHome, FaHeartbeat, FaBolt, FaRoad, FaUserShield, FaBus, FaWater, FaHandsHelping, FaIndustry, FaUsers } from 'react-icons/fa';
const DataDashboard= () => {
   
    const data = [
        { sno: 1, classification: 'Total Revenue Receipts', accounts_23_24: '2,64,597', revised_24_25: '2,93,906', budget_25_26: '3,31,569' },
        { sno: 2, classification: 'Total Revenue Expenditure', accounts_23_24: '3,09,718', revised_24_25: '3,40,374', budget_25_26: '3,73,204' },
        { sno: 3, classification: 'Revenue Deficit', accounts_23_24: '45,121', revised_24_25: '46,467', budget_25_26: '41,635' },
        { sno: 4, classification: 'Capital Expenditure', accounts_23_24: '40,500', revised_24_25: '46,766', budget_25_26: '57,231' },
        { sno: 5, classification: 'Net Loans & Advances', accounts_23_24: '4,821', revised_24_25: '8,473*', budget_25_26: '8,102' },
        { sno: 6, classification: 'Fiscal Deficit (as a % of GSDP)', accounts_23_24: '3.32', revised_24_25: '3.26*', budget_25_26: '3.00' },
        { sno: 7, classification: 'Outstanding Debt (as a % of GSDP)', accounts_23_24: '26.63', revised_24_25: '26.43', budget_25_26: '26.07' },
        { sno: 8, classification: 'Gross State Domestic Product', accounts_23_24: '27,21,571', revised_24_25: '31,15,998', budget_25_26: '35,67,818' },
    ];

    const schemes = [
        { name: 'Kalaignar Magalir Urimai Thittam', amount: '13,807' },
        { name: 'Pudhumai Penn Thittam', description: 'Girl students from Government schools (6-12) who pursue higher education', amount: '420' },
        { name: 'Tamizh Pudhalvan', description: 'Boy students from Government schools (6-12) who pursue higher education', amount: '420' },
        { name: 'Chief Minister\'s Breakfast Scheme', amount: '500' },
        { name: 'Puratchi Thalaivar MGR Nutritious Meal', amount: '2,602' },
        { name: 'Integrated Child Development Services Scheme', amount: '3,676' },
        { name: 'Dr. Muthulakshmi Reddy Maternity Benefit Scheme', amount: '1,902' },
        { name: 'Social Security Pensions', description: 'Old age pensions, Widow pensions, etc.', amount: '5,156' },
        { name: 'Chennai Metro Rail Project - Phase II', amount: '4,807' },
        { name: 'Subsidies and Grants for Public Distribution System', amount: '14,000' },
        { name: 'Kalaignar Nagarpura Membattu Thittam', amount: '2,000' },
        { name: 'Nagarpura Salai Membattu Thittam', amount: '500' },
        { name: 'Desalination Plant at Perur (400 MLD)', amount: '1,455' },
        { name: 'Kalaignarin Kanavu Illam', amount: '1,000' },
        { name: 'Mudalvarin Grama Salaiagal Membattu Thittam and Rural Roads', amount: '2,200' },
    ];

    const allocations = [
        { icon: <FaBook />, name: 'EDUCATION', amount: '55,261' },
        { icon: <FaUserShield />, name: 'POLICE', amount: '13,342' },
        { icon: <FaBuilding />, name: 'URBAN DEVELOPMENT', amount: '34,396' },
        { icon: <FaBus />, name: 'TRANSPORT', amount: '12,965' },
        { icon: <FaHome />, name: 'RURAL DEVELOPMENT', amount: '29,465' },
        { icon: <FaWater />, name: 'WATER RESOURCES', amount: '9,460' },
        { icon: <FaHeartbeat />, name: 'HEALTH', amount: '21,906' },
        { icon: <FaHandsHelping />, name: 'SOCIAL WELFARE', amount: '8,597' },
        { icon: <FaBolt />, name: 'ENERGY', amount: '21,178' },
        { icon: <FaIndustry />, name: 'INDUSTRIES AND MSME', amount: '5,833' },
        { icon: <FaRoad />, name: 'HIGHWAYS', amount: '20,722' },
        { icon: <FaUsers />, name: 'ADI-DRAVIDAR & TRIBAL WELFARE', amount: '3,924' },
    ];

    return (
      <div>
        <div className="section-container">
            <h2 className="section-title">BUDGET AT A GLANCE</h2>
            <p className="section-subtitle">Rs. in Crore</p>
            <table className="budget-table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Classification</th>
                        <th>2023-2024 Accounts</th>
                        <th>2024-2025 Revised Estimate</th>
                        <th>2025-2026 Budget Estimate</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.sno}>
                            <td>{row.sno}.</td>
                            <td>{row.classification}</td>
                            <td>{row.accounts_23_24}</td>
                            <td>{row.revised_24_25}</td>
                            <td>{row.budget_25_26}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

<div className="section-container">
            <h2 className="section-title">ALLOCATIONS FOR MAJOR ON-GOING SCHEMES</h2>
            <div className="grid-container three-column">
                {schemes.map((scheme, index) => (
                    <div className="card" key={index}>
                        <div className="card-image-placeholder"></div>
                        <div className="card-content">
                            <span className="card-title">{scheme.name}</span>
                            {scheme.description && <span className="card-description">{scheme.description}</span>}
                            <div className="amount-box">Rs.{scheme.amount} Crore</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


<div className="section-container">
            <h2 className="section-title">MAJOR SECTORAL ALLOCATIONS IN THE BUDGET</h2>
            <div className="grid-container two-column">
                {allocations.map((item, index) => (
                    <div className="card" key={index}>
                        <div className="card-icon">{item.icon}</div>
                        <div className="card-content">
                            <span className="card-title">{item.name}</span>
                            <span className="card-amount">Rs.{item.amount} Crore</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        </div>
    );
};
export default DataDashboard;
