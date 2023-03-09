let apiURL = '';

if (process.env.NODE_ENV === 'development') {
    apiURL = 'http://localhost:8080';
} else {
    apiURL = "https://petapi-production.up.railway.app";
}

export const baseURL = apiURL;