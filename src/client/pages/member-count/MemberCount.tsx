import React from 'react';
import {
    MemberCountLastWeekProvider,
    useMemberCountLastWeek
} from "./member-count-last-week-provider/MemberCountLastWeekProvider";
import {MemberCountGraph} from "./member-count-graph/MemberCountGraph";
import {PageContainer} from "../../framework/page-container/PageContainer";
import {
    PredictedMemberCountProvider,
    usePredictedMemberCount
} from "../predicted-member-count/predicted-member-count-provider/PredictedMemberCountProvider";
import {PredictedMemberCountGraph} from "../predicted-member-count/predicted-member-count-graph/PredictedMemberCountGraph";

const MemberCount: React.FC = () => {
    return (
        <PageContainer>
            <div>
                <div>
                    <PredictedMemberCountProvider>
                        <PredictedMemberCountGraph getData={() => usePredictedMemberCount()} />
                    </PredictedMemberCountProvider>
                </div>
                <div>

                </div>
            </div>
            <MemberCountLastWeekProvider>
                <MemberCountGraph getData={() => useMemberCountLastWeek()} />
            </MemberCountLastWeekProvider>
        </PageContainer>
    )
}

export { MemberCount };
