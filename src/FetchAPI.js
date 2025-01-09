import axios from "axios";
export default class FetchAPI {
    constructor() {
        this.greeting = async (token) => {
            let headers={"Authorization": "Bearer "+token};
            return await fetch(null, "get",'/api/greeting',"json",headers);            
        }
        this.login = async loginObj => {
            return await fetch(loginObj, "post", '/api/login');
        }

        const api = axios.create();
        // add the response interceptor
        api.interceptors.response.use(
            null, // default success handler
            (error) => {
                console.log(error.toJSON());
                return Promise.reject({
                    status: error.response?.status,
                    message:
                        error.response?.data ?? error.response?.statusText ?? error.message,
                });
            },
            {
                synchronous: true, // optimise interceptor handling
            }
        );
        const fetch = async (data, method, url, responseType, headers) => {
            const requestObj = {
                url,
                method,
                responseType,
                headers,
                [method.toLowerCase() === "get" ? "params" : "data"]: data,
            };
            const response = await api(requestObj); // use the created instance
            //console.log(response);
            if (response.request.responseType === "blob") {
                let fileName = response.headers["content-disposition"];

                let firstIndex = fileName.indexOf("filename=");
                fileName = fileName.substring(firstIndex + 9).replaceAll('"', '');

                const newBlob = new Blob([response.data]);
                const objUrl = window.URL.createObjectURL(newBlob);
                const link = document.createElement("a");

                link.href = objUrl;
                link.download = fileName;
                link.click();
            }
            return response.data;
        };
    }
}