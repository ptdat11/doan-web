import { JwtTokenPair } from "../../interfaces/api-formats/login";
import { JWT } from "../jwt/jwt";
import LocalStorage from "../local-storage/local-storage";
import { jsonFetch } from "./jsonFetch";
import Cookies from "js-cookie";

export const refreshToken = async (refreshUrl: string): Promise<string | undefined> => {
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

    let response: {
        status: number,
        data: {
            access: string
        }
    };
    try {
        response = await jsonFetch<{ access: string }>(
            refreshUrl,
            "POST",
            refreshData, {
                "Authorization": "Bearer " + localAccess
        });
    }
    catch {
        return undefined;
    }

    // const newJwt: JwtTokenPair = {
    //     refresh: localRefresh,
    //     access: response.data.access
    // }
    // LocalStorage.set("jwt", newJwt);
    Cookies.set("access", response.data.access);

    return response.data.access;
};