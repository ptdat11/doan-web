import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../states/system-states";
import { loginPOST, JwtTokenPair } from "../interfaces/api-formats/login";
import { jsonFetch } from "../submodules/networking/jsonFetch";
import LocalStorage from "../submodules/local-storage/local-storage";
import { CustomJWT } from "../submodules/jwt/jwt-interface";
import { JWT } from "../submodules/jwt/jwt";

interface CallbackResultParams {
    username: string,
    password: string
};

const useSignIn = () => {
    const loginApiUrl = useRecoilValue(apiUrlSelector("login"));

    const callbackResult = async (params: CallbackResultParams) => {
        const data: loginPOST = params;
        let response = await jsonFetch<JwtTokenPair>(loginApiUrl, "POST", data);
        
        if (response.status === 400) {
            return;
        }

        LocalStorage.set("jwt", response.data);

        const [access, expired] = JWT.parse<CustomJWT>(response.data.access);
        LocalStorage.set("userid", access.user_id);
    };

    return callbackResult;
};

export default useSignIn;