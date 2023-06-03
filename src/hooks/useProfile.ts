import { useRecoilValue } from "recoil";
import useFetch from "./useFetch";
import { apiUrlSelector } from "../states/system-states";
import { profileGET } from "../interfaces/api-formats/profile";
import useRefreshToken from "./useRefreshToken";
import { useEffect, useState } from "react";
import { refreshToken } from "../submodules/networking/refresh-token";
import { jsonFetch } from "../submodules/networking/jsonFetch";

const useProfile = () => {
    const [profile, setProfile] = useState<profileGET>();
    const profileApiUrl = useRecoilValue(apiUrlSelector("profile"));
    const refreshApiUrl = useRecoilValue(apiUrlSelector("token/refresh"));

    const getProfile = async () => {
        const accessToken = await refreshToken(refreshApiUrl);

        if (!accessToken)
            return undefined;
        
        const response = await jsonFetch<profileGET>(
            profileApiUrl,
            "GET",
            undefined,
            {
                "Authorization": "Bearer " + accessToken
            }
        );

        return response.data;
    };

    useEffect(() => {
        let isCurrent = true;

        getProfile().
        then(response => {
            if (isCurrent) 
                setProfile(response);
        }).
        catch(err => setProfile(undefined));

        return () => {
            isCurrent = false;
        };
    }, []);
            
    return profile;
};

export default useProfile;