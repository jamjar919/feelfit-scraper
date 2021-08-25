import React, {useEffect, useState} from "react";
import {MemberCountResponse} from "../../../../common/ApiResponse";
import {Path} from "../../../../common/Path";

const MemberCountLastWeekContext = React.createContext<MemberCountResponse>([]);

const MemberCountLastWeekProvider: React.FC = (props) => {
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

    return <MemberCountLastWeekContext.Provider value={value}>{children}</MemberCountLastWeekContext.Provider>
}

const useMemberCountLastWeek = () => React.useContext(MemberCountLastWeekContext);

export { MemberCountLastWeekProvider, useMemberCountLastWeek };
