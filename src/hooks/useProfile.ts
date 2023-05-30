import { useRecoilValue } from "recoil";
import useFetch from "./useFetch";
import { apiUrlSelector } from "../states/system-states";
import LocalStorage from "../submodules/local-storage/local-storage";
import { JwtTokenPair } from "../interfaces/api-formats/login";
import { profileGET } from "../interfaces/api-formats/profile";

interface Params {
    token?: string
}

const useProfile = (params: Params) => {
    if (!params.token) {
        return;
    }

    const profileApiUrl = useRecoilValue(apiUrlSelector("profile"));
    const profile = useFetch<profileGET>({
        url: profileApiUrl,
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + LocalStorage.get<JwtTokenPair>("jwt")?.access
        }
    }, []);

    return profile.data;
};

export default useProfile;