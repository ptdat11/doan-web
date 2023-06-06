import { useRecoilValue } from "recoil";
import { JwtTokenPair } from "../interfaces/api-formats/login";
import { JWT } from "../submodules/jwt/jwt";
import LocalStorage from "../submodules/local-storage/local-storage";
import { apiUrlSelector } from "../states/system-states";
import { jsonFetch } from "../submodules/networking/jsonFetch";
import { useState } from "react";
import Cookies from "js-cookie";

const useRefreshToken = (): string | undefined => {
    const [newAccess, setNewAccess] = useState<string | undefined>(undefined);
    const refreshApiUrl = useRecoilValue(apiUrlSelector("token/refresh"));
    const localAccess = Cookies.get("access");
    const localRefresh = Cookies.get("refresh");

    if (!localRefresh) {
        return undefined;
    }

    if (localAccess) {
        let access = JWT.parse(localAccess);
        if (!access.expired) {
            return localAccess;
        }
    }
    if (localRefresh) {
        let refresh = JWT.parse(localRefresh);
        if (refresh.expired) {
            return undefined;
        }
    }

    const refreshData = {
        refresh: localRefresh
    };
    jsonFetch<{ access: string }>(
        refreshApiUrl,"POST",
        refreshData, {
            "Authorization": "Bearer " + localAccess
    }).then(response => { 
        // const newJwt = {
        //     refresh: localRefresh,
        //     access: response.data.access
        // }        
        // LocalStorage.set("jwt", newJwt);
        Cookies.set("access", response.data.access);
        setNewAccess(response.data.access);
    });

    return newAccess;
};

export default useRefreshToken;