import React from "react";
import {Footer} from "../footer/Footer";

import "./PageContainer.scss";

const PageContainer: React.FC = ({ children }) => {
    return (
        <div className="pageContainer">
            {children}
            <Footer />
        </div>
    )
}

export { PageContainer };
