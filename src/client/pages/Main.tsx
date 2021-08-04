import React from 'react';
import {MemberCountProvider} from "./member-count-provider/MemberCountProvider";
import {MemberCountGraph} from "./member-count-graph/MemberCountGraph";

const Main: React.FC = () => {
    return (
        <MemberCountProvider>
            <MemberCountGraph />
        </MemberCountProvider>
    )
}

export { Main };
