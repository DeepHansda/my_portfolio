import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const axoisClient = axios.create({
    baseURL: "https://my-portfolio-backend-lac.vercel.app/api",
    headers: {
        Accept: "application/json",
    }
})

const request = async ({ ...options }: 
    AxiosRequestConfig<any>
) => {
    const onSuccess = (response: AxiosResponse) => response.data
    const onError = (error: AxiosError) => {
        if (error.response?.status === 403) {
            console.error("Access forbidden (403)");
        }
        console.log("error axios-utils", error?.response);
        return error;
    }

    try {
        const response = await axoisClient(options)
        return onSuccess(response)
    } catch (error) {
        if (error instanceof AxiosError) {
            return onError(error);
        } else {
            console.error("Unknown error occurred:", error);
            throw error; // Rethrow non-Axios errors
        }
    }

}
export default request