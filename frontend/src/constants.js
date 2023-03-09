let apiURL = '';

if (process.env.NODE_ENV === 'development') {
    apiURL = 'http://localhost:8080';
    console.log(apiURL);
} else {
    apiURL = import.meta.env.API_URL;
    console.log(apiURL);
}

export const baseURL = apiURL;