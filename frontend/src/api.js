import axios from "axios";

const api = axios.create({ 
    baseURL: 'https://fithub-backend-zz72.onrender.com/api/user/auth'
      });

      export const googleAuth = (code) => api.get(`/google?code=${code}`)