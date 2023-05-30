import { useRecoilValue } from "recoil";
import { JwtTokenPair } from "../interfaces/api-formats/login";
import { JWT } from "../submodules/jwt/jwt";
import LocalStorage from "../submodules/local-storage/local-storage";
import { apiUrlSelector } from "../states/system-states";
import { jsonFetch } from "../submodules/networking/jsonFetch";
import useFetch from "./useFetch";

const useRefreshToken = (): string | undefined => {
    const refreshApiUrl = useRecoilValue(apiUrlSelector("token/refresh"));
    const localJWT = LocalStorage.get<JwtTokenPair>("jwt");
    if (!localJWT) {
        return undefined;
    }

    const [access, expired] = JWT.parse(localJWT.access);
    if (!expired) {
        return localJWT.access;
    }

    const refreshData = {
        refresh: localJWT.refresh
    };
    const response = useFetch<{ access: string }>({
        url: refreshApiUrl,
        method: "POST",
        data: refreshData,
        headers: {
            "Authorization": "Bearer " + localJWT.access
        }
    }, []);
    LocalStorage.set("jwt", {
        ...localJWT,
        access: response.data?.access
    })

    return response.data?.access;
};

export default useRefreshToken;