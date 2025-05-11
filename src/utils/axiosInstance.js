import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL, VERSION_URL } from "../../config";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}${VERSION_URL}`,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
