import axios from "axios";
import { encryptString, decryptString } from "@/utils/encryptionUtils";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const userToken = localStorage.getItem("authToken");
      console.log("added Bearer Tokem11", userToken);
      if (userToken) {
        console.log("added Bearer Token");
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }

    if (
      config.headers["Content-Type"] &&
      config.headers["Content-Type"].startsWith("multipart/form-data")
    ) {
      console.log("Multipart request detected");
    } else {
      config.headers["Content-Type"] = "application/json";

      if (config.data) {
        console.log("Request Body:", config.data);
        config.data = JSON.stringify({ body: encryptString(config.data) });
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response body as needed
    // For example, you can decrypt the body

    if (response.config.url == "/aws/upload") {
    } else if (response.data) {
      response.data = decryptString(response.data.body);
      console.log("Response Body:", response.data);
    }

    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);
export default axiosInstance;
