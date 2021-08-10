import React from "react";

import "./Footer.scss";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <ul>
                <li>Created by <a href="https://thejamespaterson.com">James Paterson</a></li>
                <li>View on <a href="https://github.com/jamjar919/feelfit-scraper">Github</a></li>
                <li>Not affiliated with <a href="https://www.feelfitgym.com/">Feelfit Gym</a></li>
            </ul>
        </footer>
    )
}

export { Footer };
