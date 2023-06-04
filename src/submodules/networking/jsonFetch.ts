export type APIMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

export const jsonFetch = async <T extends unknown> (
    url: string,
    method?: APIMethod,
    data?: any,
    headers?: HeadersInit,
    removeEndSlash?: boolean
) => {

    url = url.endsWith("/") ? url : url + (removeEndSlash ? "" :  "/");
    let trueUrl = url + ((method === "GET" && data != undefined && data != null) ?
        `?${new URLSearchParams(data).toString()}` :
        ""
    );

    let response = await fetch(trueUrl, {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            ...headers
        },
        body: (method !== "GET" && data) ? JSON.stringify(data) : undefined,
        mode: "cors",
        credentials: "same-origin"
    });

    let result = {
        status: response.status,
        data: (await response.json()) as T
    };

    return result;
}