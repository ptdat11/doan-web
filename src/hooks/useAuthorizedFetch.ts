import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../states/system-states";
import { useEffect, useState } from "react";
import { refreshToken } from "../submodules/networking/refresh-token";
import { APIMethod, jsonFetch } from "../submodules/networking/jsonFetch";
import { FetchResult } from "./useFetch";

const useAuthorizedFetch = <T extends unknown>(params: {
    url: string,
    method?: APIMethod,
    data?: any,
    headers?: HeadersInit
}) => {
    const [result, setResult] = useState<FetchResult<T>>({
        loading: true,
        data: null,
        errorMessage: null
    });

    const refreshApiUrl = useRecoilValue(apiUrlSelector("token/refresh"));

    const getData = async () => {
        const accessToken = await refreshToken(refreshApiUrl);

        if (!accessToken)
            return undefined;
        
        const response = await jsonFetch<T>(
            params.url,
            params.method,
            params.data,
            {
                ...params.headers,
                "Authorization": "Bearer " + accessToken
            }
        );

        return response.data;
    };

    useEffect(() => {
        let isCurrent = true;

        getData().
        then(response => {
            if (isCurrent) 
                setResult({
                    loading: false,
                    data: response as T,
                    errorMessage: null
                });
        }).
        catch(err => setResult({
            loading: false,
            data: null,
            errorMessage: err
        }));

        return () => {
            isCurrent = false;
        };
    }, []);
            
    return result;
};

export default useAuthorizedFetch;