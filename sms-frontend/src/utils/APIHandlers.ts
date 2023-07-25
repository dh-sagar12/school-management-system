// Make sure you have installed axios in your project (npm install axios)

import axios from 'axios';



const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});



class ApiHandler {

  constructor() {
  }
  // GET request
  async get(url: string, params: object = {}) {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST request
  async post(url: string, data: object) {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PUT request
  async put(url: string, data: object) {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  async delete(url: string) {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error: any) {
    // console.log('error', error);
    const error_response = {
      'message': error?.response?.data?.error ? error?.response?.data?.error : "Invalid Request",
      'status': error?.response?.status ? error?.response?.status : 400
    }
    throw error_response;
  }

}

export default new ApiHandler();
