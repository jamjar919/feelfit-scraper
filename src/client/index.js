import React from 'react';
import ReactDOM from 'react-dom';
import {MemberCount} from "./pages/member-count/MemberCount";

import "./reset.scss";
import "./typography.scss";

ReactDOM.render(
    <MemberCount />,
    document.getElementById('app')
);