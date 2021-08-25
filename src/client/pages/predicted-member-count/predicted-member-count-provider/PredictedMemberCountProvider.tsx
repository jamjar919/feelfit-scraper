import React, {useEffect, useState} from "react";
import {PredictedMemberCountResponse} from "../../../../common/ApiResponse";
import {Path} from "../../../../common/Path";

const MemberCountDayContext = React.createContext<PredictedMemberCountResponse>([]);

const PredictedMemberCountProvider: React.FC = (props) => {
    const { children } = props;

    const [value, setValue] = useState<PredictedMemberCountResponse>([]);

    useEffect(() => {
        setValue([]);

        fetch(Path.GET_COUNT_PREDICTED_DAY)
            .then((resp) => resp.json())
            .then((data) => setValue(data))
            .catch((error) => {
                console.error(error);

                setValue([]);
            })
    }, []);

    return <MemberCountDayContext.Provider value={value}>{children}</MemberCountDayContext.Provider>
}

const usePredictedMemberCount = () => React.useContext(MemberCountDayContext);

export { PredictedMemberCountProvider, usePredictedMemberCount };
