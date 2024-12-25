import axios from "axios";

const api = axios.create({ 
    baseURL: 'http://localhost:4001/api/user/auth'
      });

      export const googleAuth = (code) => api.get(`/google?code=${code}`)