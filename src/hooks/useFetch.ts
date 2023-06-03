import { useState, useEffect } from "react";
import { APIMethod, jsonFetch } from "../submodules/networking/jsonFetch";

interface Params {
    url: string,
    method?: APIMethod,
    data?: any,
    headers?: HeadersInit
};

export interface FetchResult<T extends unknown> {
    loading: boolean,
    data: T | null,
    errorMessage: string | null
};
const useFetch = <T extends unknown>(params: Params, deps?: React.DependencyList) => {

    const [result, setResult] = useState<FetchResult<T>>({
        loading: true,
        data: null,
        errorMessage: null
    });

    useEffect(() => {
        let isCurrent = true;

        jsonFetch<T>(
            params.url,
            params.method,
            params.data,
            params.headers
        ).
        then(obj => {
            if (isCurrent) {
                setResult({
                    loading: false,
                    data: obj.data,
                    errorMessage: null
                });
            }
        }).
        catch(err => setResult({
            loading: false,
            data: null,
            errorMessage: err
        }));

        return () => {
            isCurrent = false;
        }
    }, deps);


    return result;
};

export default useFetch;