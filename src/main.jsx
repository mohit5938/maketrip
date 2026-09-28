
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import axios from "axios";

// Global axios interceptor for cross-origin Bearer token auth
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  </Provider>
)
