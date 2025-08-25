const BASE_URL = "http://68.178.175.207:8001";


const url = {
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
  
};


export default url;
