import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://api.chefium.com.ar/v1/dietas/";

class DietService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  get(id){
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  update(id, diet){
    return axios.put(API_URL + id, diet, { headers: authHeader() });
  }
  
  delete(id){
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new DietService();