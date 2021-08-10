import React from 'react';
import {MemberCountProvider} from "./member-count-provider/MemberCountProvider";
import {MemberCountGraph} from "./member-count-graph/MemberCountGraph";
import {PageContainer} from "../../framework/page-container/PageContainer";

const MemberCount: React.FC = () => {
    return (
        <PageContainer>
            <MemberCountProvider>
                <MemberCountGraph />
            </MemberCountProvider>
        </PageContainer>
    )
}

export { MemberCount };
