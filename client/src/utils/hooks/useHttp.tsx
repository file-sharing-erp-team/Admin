import { useState, useCallback } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url: any, method: any, body: string, headers: { [x: string]: string; }) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }
            let data;
            const response = await axios({ method, url, data: body, headers })
                .then((res) => {
                    data = res.data;
                })
                .catch(async (error) => {
                    const cookies = new Cookies();
                    const refreshToken = cookies.get("refreshToken");
                    if (error.status === 401 && refreshToken !== undefined) {
                        const reAuth = await axios({
                            method: "GET",
                            url: "",
                            data: {
                                refreshToken: refreshToken,
                            },
                            headers: {},
                        });
                    }
                    setLoading(false);
                    setError(error);
                    throw error;
                });
            setLoading(false);
            return data;
        } catch (e: any) {
            setLoading(false);
            setError(e);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};

