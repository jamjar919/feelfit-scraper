import React from 'react';
import {PredictedMemberCountResponse} from "../../../../common/ApiResponse";

type PredictedMemberCountGraphProps = {
    getData: () => PredictedMemberCountResponse
}

const PredictedMemberCountGraph: React.FC<PredictedMemberCountGraphProps> = (props) => {
    const memberCount = props.getData();

    return (
        <div>
            {JSON.stringify(memberCount)}
        </div>
    );
}

export { PredictedMemberCountGraph };
