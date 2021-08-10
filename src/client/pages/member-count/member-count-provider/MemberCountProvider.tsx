import React, {useEffect, useState} from "react";
import {MemberCountResponse} from "../../../../common/ApiResponse";
import {Path} from "../../../../common/Path";

const MemberCountContext = React.createContext<MemberCountResponse>([]);

const MemberCountProvider: React.FC = (props) => {
    const { children } = props;

    const [value, setValue] = useState<MemberCountResponse>([]);

    useEffect(() => {
        setValue([]);

        fetch(Path.GET_COUNT_LAST_WEEK)
            .then((resp) => resp.json())
            .then((data) => setValue(data))
            .catch((error) => {
                console.error(error);

                setValue([]);
            })
    }, []);

    return <MemberCountContext.Provider value={value}>{children}</MemberCountContext.Provider>
}

const useMemberCount = () => React.useContext(MemberCountContext);

export { MemberCountProvider, useMemberCount };
