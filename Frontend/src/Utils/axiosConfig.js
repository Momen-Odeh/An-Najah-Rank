import axios from "axios";

// Set default base URL
axios.defaults.baseURL = "http://localhost:5000";

// Set default params
axios.defaults.params = {
  token: "",
};

export default axios;
