// Make sure you have installed axios in your project (npm install axios)

import { RcFile } from 'antd/es/upload/interface';
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


  
  // POST request with file upload
  async postWithFile(url: string, data: object, file: string | Blob | RcFile, config: object) {
    try {
      // Create a FormData object to handle the file upload
      const formData = new FormData();
      formData.append('original_file_name', file); // 'original_file_name' should match the server's expected file parameter name

      // Append other data to the FormData object if needed
      for (const [key, value] of Object.entries(data)) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, value.toString());
        }
      }

      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
        ...config
      });

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

  async promises(urls: string[]) {
    try {
      // Create an array of promises for each URL
      const promises = urls.map((url) => api.get(url));

      // Use axios.all() to resolve all promises simultaneously
      const responses = await axios.all(promises);

      // Extract and return the response data from each resolved promise
      return responses.map((response) => response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }


  // Handle API errors
  handleError(error: any) {
    console.log('error', error);
    const error_response = {
      'message': error?.response?.data?.error ? error?.response?.data?.error : "Invalid Request",
      'status': error?.response?.status ? error?.response?.status : 400
    }
    throw error_response;
  }

}

export default new ApiHandler();
