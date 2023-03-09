let apiURL = '';

if (process.env.NODE_ENV === 'development') {
    apiURL = 'http://localhost:8000';
} else {
    apiURL = import.meta.env.API_URL;
}

export const baseURL = apiURL;