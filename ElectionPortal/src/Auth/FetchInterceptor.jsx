const enableSecure = import.meta.env.VITE_ENABLE_SECURE === 'true';

// Save original fetch
const originalFetch = window.fetch;

window.fetch = async function(input, init = {}) {
  const modifiedInit = { ...init };
  
  // Handle credentials based on security setting
  if (enableSecure) {
    modifiedInit.credentials = 'include';
    
    // Add CSRF token for modifying requests
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(modifiedInit.method?.toUpperCase())) {
      // Get CSRF token from cookies
      const getCSRFToken = () => {
        return document.cookie
          .split('; ')
          .find(row => row.startsWith('csrftoken='))
          ?.split('=')[1];
      };
      
      // Set headers if not provided
      const headers = new Headers(modifiedInit.headers || {});
      
      if (!headers.has('X-CSRFToken')) {
        const csrfToken = getCSRFToken();
        if (csrfToken) {
          headers.append('X-CSRFToken', csrfToken);
        }
      }
      
      modifiedInit.headers = headers;
    }
  } else {
    // Remove credentials if present
    if ('credentials' in modifiedInit) {
      delete modifiedInit.credentials;
    }
  }

  return originalFetch(input, modifiedInit);
};