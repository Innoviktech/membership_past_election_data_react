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
  get_polling_booth: {
    method: "GET",
    url: `${BASE_URL}/get_polling_booth`,
  },
  polling_station_editable_pdf: {
    method: "GET",
    url: `${BASE_URL}/polling_station_editable_pdf`,
  },
  
};


export default url;
