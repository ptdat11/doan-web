import { useRecoilValue } from "recoil"
import { apiUrlSelector } from "../states/system-states"
import useAuthorizedFetch from "./useAuthorizedFetch";
import { profileGET } from "../interfaces/api-formats/profile";

const useProfile = () => {
    const profileApiUrl = useRecoilValue(apiUrlSelector("profile"));
    const profile = useAuthorizedFetch<profileGET>({
        url: profileApiUrl,
        method: "GET"
    });

    return profile.data;
};

export default useProfile;