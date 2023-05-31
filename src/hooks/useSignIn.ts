import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../states/system-states";
import { loginPOST, JwtTokenPair } from "../interfaces/api-formats/login";
import { jsonFetch } from "../submodules/networking/jsonFetch";
import LocalStorage from "../submodules/local-storage/local-storage";

const useSignIn = () => {
    const loginApiUrl = useRecoilValue(apiUrlSelector("login"));

    const callbackResult = async (user: loginPOST, handleError?: () => void) => {
        let response = await jsonFetch<JwtTokenPair>(loginApiUrl, "POST", user);
        
        if (response.status === 400) {
            if (handleError) {
                handleError();
            }
            return;
        }

        LocalStorage.set("jwt", response.data);

        return response.status;
    };

    return callbackResult;
};

export default useSignIn;