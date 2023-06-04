import React from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import DefaultAvatar from "../../../components/avatar/DefaultAvatar";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import Show from "../../../components/flow-control/if/Show";
import loading from "../../../assets/loading.gif";
import Hr from "../../../components/hr/Hr";
import ArrowButton from "../../../components/button/ArrowButton";
import { jsonFetch } from "../../../submodules/networking/jsonFetch";
import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../../states/system-states";
import { refreshToken } from "../../../submodules/networking/refresh-token";
import { Link } from "react-router-dom";
import useProfile from "../../../hooks/useProfile";

interface Props extends BaseProps {}

const UserInfo: React.FC<Props> = React.memo((props) => {
    const profile = useProfile();
    const ordersApiUrl = useRecoilValue(apiUrlSelector("orders"));
    const refreshApiUrl = useRecoilValue(apiUrlSelector("token/refresh"));

    const handleClickHistory = async () => {
        const accessToken = await refreshToken(refreshApiUrl);

        const history = await jsonFetch(
            ordersApiUrl,
            "GET",
            undefined,
            {
                "Authorization": "Bearer " + accessToken
            }
        );
        console.log(history.data)
    };

    return (
        <div 
            className={combineClassnames(
                props.className,
                "w-full px-5 lg:px-60 xl:px-96 [&>*]:mx-auto"
            )}
        >
            <div className="w-full flex px-16 py-3 rounded-xl bg-[#dddddd]">
                <DefaultAvatar size={90} />
                <Show 
                    when={!!profile}
                    fallback={<img className="h-12 my-auto pl-5" src={loading} />}
                >
                    <div className="grow px-5 py-2 flex flex-col">
                        <h2 className="text-3xl font-bold">
                            {profile?.name}
                        </h2>
                        <p className="my-auto">
                            {profile?.phone_number}
                        </p>
                    </div>
                </Show>
            </div>
            
            <Hr className="my-7"/>
            <Link to="/history">
                <div 
                    className="w-full py-3 px-3 text-xl rounded-xl flex items-center justify-between cursor-pointer bg-[#eeeeeecc] hover:bg-[#eeeeee] active:text-[#e42f2f]"
                    onClick={handleClickHistory}
                >
                    Lịch sử mua hàng
                    <ArrowButton 
                        size={20}
                        direction="right" 
                    />
                </div>
            </Link>
        </div>
    );
});

export default UserInfo;