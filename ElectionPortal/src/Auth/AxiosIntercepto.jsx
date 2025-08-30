import axios from 'axios';

const enableSecure = import.meta.env.VITE_ENABLE_SECURE === 'true';

// Apply credentials to ALL Axios requests
axios.defaults.withCredentials = enableSecure;

// Optional: Auto-add CSRF token from cookies
axios.interceptors.request.use((config) => {
  if (enableSecure) {
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='))
      ?.split('=')[1];

    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
  }
  return config;
});

export default axios;