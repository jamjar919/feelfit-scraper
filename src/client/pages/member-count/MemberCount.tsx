import React from 'react';
import {PageContainer} from "../../framework/page-container/PageContainer";
import {
    DailyMemberCountProvider,
    useDailyMemberCount
} from "./provider/daily-member-count-provider/DailyMemberCountProvider";
import {
    PredictedMemberCountProvider,
    usePredictedMemberCount
} from "./provider/predicted-member-count-provider/PredictedMemberCountProvider";
import {PredictedMemberCountGraph} from "./graph/predicted-member-count-graph/PredictedMemberCountGraph";
import {
    MemberCountLastWeekProvider,
    useMemberCountLastWeek
} from "./provider/member-count-last-week-provider/MemberCountLastWeekProvider";
import {MemberCountGraph} from "./graph/member-count-graph/MemberCountGraph";

import "./MemberCount.scss";

const MemberCount: React.FC = () => {
    const date = new Date().toDateString();

    return (
        <PageContainer>
            <DailyMemberCountProvider>
                <h1>Predicted Traffic for Today ({date})</h1>
                <div className="graph-container">
                    <div className="graph-wrapper">
                        <PredictedMemberCountProvider>
                            <PredictedMemberCountGraph
                                getCurrent={() => useDailyMemberCount()}
                                getPredicted={() => usePredictedMemberCount()}
                            />
                        </PredictedMemberCountProvider>
                    </div>
                </div>
                <h1>Last Week Traffic</h1>
                <div className="graph-container">
                    <div className="graph-wrapper">
                        <MemberCountLastWeekProvider>
                            <MemberCountGraph getData={() => useMemberCountLastWeek()} />
                        </MemberCountLastWeekProvider>
                    </div>
                </div>
            </DailyMemberCountProvider>
        </PageContainer>
    )
}

export { MemberCount };
