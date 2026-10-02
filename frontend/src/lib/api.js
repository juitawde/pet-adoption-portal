import axios from "axios";

export const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://petmatch-backend-qi7c.onrender.com/api";

export const SOCKET_URL =
    import.meta.env.VITE_SOCKET_URL ||
    "https://petmatch-backend-qi7c.onrender.com";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

/*
 * Automatically attach JWT token to protected requests.
 */
api.interceptors.request.use(
    //An interceptor lets Axios run some code before sending a request.
    (config) => {
        const token = localStorage.getItem(
            "petmatch_token"
        );

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/*
 * If JWT expires/becomes invalid, clear the local session.
 */
api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("petmatch_token");
            localStorage.removeItem("petmatch_user");
        }

        return Promise.reject(error);
    }
);

export default api;