import { JwtTokenPair } from "../../interfaces/api-formats/login";
import { JWT } from "../jwt/jwt";
import LocalStorage from "../local-storage/local-storage";
import { jsonFetch } from "./jsonFetch";

export const refreshToken = async (refreshUrl: string): Promise<string | undefined> => {
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
                "Authorization": "Bearer " + localJwt.access
        });
    }
    catch {
        return undefined;
    }

    const newJwt: JwtTokenPair = {
        refresh: localJwt.refresh,
        access: response.data.access
    }
    LocalStorage.set("jwt", newJwt);

    return newJwt.access
};