const BASE_URL = import.meta.env.VITE_ORIGIN === "diff" ? "/api" : "http://68.178.175.207:8001";


const url = {
  getFinancialDataByState: {
  method: "GET",
  url: `${BASE_URL}/api/financial/`,
},
  get_state: {
    method: "GET",
    url: `${BASE_URL}/get_state`,
  },
  get_district_by_state: {
    method: "GET",
    url: `${BASE_URL}/get_district_by_state`,
  },
  get_constituancy_by_district: {
    method: "GET",
    url: `${BASE_URL}/get_constituancy_by_district`,
  },
  get_polling_booth_by_constituancy: {
    method: "GET",
    url: `${BASE_URL}/get_polling_booth_by_constituancy`,
  },
  get_polling_booth: {
    method: "GET",
    url: `${BASE_URL}/get_polling_booth`,
  },
  polling_station_editable_pdf: {
    method: "GET",
    url: `${BASE_URL}/polling_station_editable_pdf`,
  },
  pdf_page_count: {
    method: "POST",
    url: `${BASE_URL}/pdf_page_count`,
  },
  upload_and_convert_pdfs: {
    method: "POST",
    url: `${BASE_URL}/upload_and_convert_pdfs`,
  },
  store_payment_details: {
    method: "POST",
    url: `${BASE_URL}/store_payment_details`,
  },
  getAllParty: {
    method: "GET",
    url: `${BASE_URL}/get_all_party`,
  },
  getAllElectionType: {
    method: "GET",
    url: `${BASE_URL}/get_all_election_type`,
  },
  getYearByElectionType: {
    method: "GET",
    url: `${BASE_URL}/get_year_by_election_type`,
  },
  getManifestoPromisesByParty: {
    method: "POST",
    url: `${BASE_URL}/get_manifesto_promises_by_party`,
  },
  getAllManifestoPromises: {
    method: "POST",
    url: `${BASE_URL}/get_all_manifesto_promises`,
  },
  isAuthenticate: {
    method: "GET",
    url: `${BASE_URL}/isAuthenticate`,
  },
  getCSRF: {
    method: "GET",
    url: `${BASE_URL}/csrf/`,
  },
  apiSecureLogin: {
    method: "POST",
    url: `${BASE_URL}/api/login/`,
  },
};


export default url;
