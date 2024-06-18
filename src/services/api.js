import { auth } from '../firebaseConfig';

const API_BASE_URL = 'https://api.example.com';

const getAuthToken = async () => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return null;
};

const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const token = await getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
};

export const get = (endpoint) => apiRequest(endpoint);
export const post = (endpoint, body) => apiRequest(endpoint, 'POST', body);
export const put = (endpoint, body) => apiRequest(endpoint, 'PUT', body);
export const del = (endpoint) => apiRequest(endpoint, 'DELETE');