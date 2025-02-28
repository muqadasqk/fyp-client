import { setLoading, clearError, setError } from "@features/ui/uiSlice";
import api from "@services/axiosInstance";
import { showErrorToast, showSuccessToast } from "@utils/toast";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useApi = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    const handleRequest = async (method, endpoint, body = null) => {
        dispatch(setLoading(true));
        dispatch(clearError());

        const toastId = toast.loading('Loading...', {
            position: "top-right",
        });

        try {
            const response = await api({
                url: endpoint,
                method,
                data: body,
            });

            setData(response.data);
            toast.remove(toastId);
            showSuccessToast(response.data.message);
            return response;

        } catch (error) {
            const errorMessage = error.response?.data?.message ?? "Something went wrong";

            dispatch(setError(errorMessage));
            toast.remove(toastId);
            showErrorToast(errorMessage);
            throw error;

        } finally {
            dispatch(setLoading(false));
        }
    };

    const get = (endpoint) => handleRequest("GET", endpoint);
    const getById = (endpoint, id) => handleRequest("GET", `${endpoint}/${id}`);
    const post = (endpoint, data) => handleRequest("POST", endpoint, data);
    const put = (endpoint, data) => handleRequest("PUT", endpoint, data);
    const del = (endpoint) => handleRequest("DELETE", endpoint);

    return { data, get, getById, post, put, delete: del };
};

export default useApi;