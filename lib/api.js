import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const getShops = async () => {
    const response = await api.get("/shops");
    return response.data;
};

export const updateFileSettings = async (fileId, settings) => {
    const response = await api.patch(`/files/${fileId}/settings`, settings);
    return response.data;
};

export const createPaymentOrder = async (amount) => {
    const response = await api.post("/payments/create-order", null, {
        params: { amount },
    });
    return response.data;
};
