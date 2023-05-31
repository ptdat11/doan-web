import { useRecoilValue } from "recoil";
import { JwtTokenPair } from "../interfaces/api-formats/login";
import { JWT } from "../submodules/jwt/jwt";
import LocalStorage from "../submodules/local-storage/local-storage";
import { apiUrlSelector } from "../states/system-states";
import useFetch from "./useFetch";
import { CustomJWT } from "../submodules/jwt/jwt-interface";
import { jsonFetch } from "../submodules/networking/jsonFetch";
import { useState } from "react";

const useRefreshToken = (): string | undefined => {
    const [newAccess, setNewAccess] = useState("");
    const refreshApiUrl = useRecoilValue(apiUrlSelector("token/refresh"));
    const localJwt = LocalStorage.get<JwtTokenPair>("jwt");
    if (!localJwt) {
        return undefined;
    }

    if (localJwt.access) {
        let access = JWT.parse(localJwt.access);
        if (!access.expired) {
            return localJwt.access;
        }
    }
    if (localJwt.refresh) {
        let refresh = JWT.parse(localJwt.refresh);
        if (refresh.expired) {
            return undefined;
        }
    }

    const refreshData = {
        refresh: localJwt.refresh
    };
    jsonFetch<{ access: string }>(
        refreshApiUrl,"POST",
        refreshData, {
            "Authorization": "Bearer " + localJwt.access
    }).then(response => { 
        const newJwt = {
            refresh: localJwt.refresh,
            access: response.data.access
        }        
        LocalStorage.set("jwt", newJwt);
        setNewAccess(newJwt.access);
    });

    return newAccess;
};

export default useRefreshToken;