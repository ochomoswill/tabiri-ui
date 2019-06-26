import React from "react";
import './index.css'
import LocationIcon from "../../assets/images/custom/location.svg";

const AdmUnitCard = ({name, code}) => {

    return (
        <div className="listings-container compact-list-layout margin-top-16">
        <a href="single-job-page.html" className="job-listing with-apply-button">
            {/* Adm Unit Listing Details */}
            <div className="job-listing-details">

                {/* Adm Unit Logo */}
                <div className="job-listing-company-logo">
                    <img src={LocationIcon} alt=""/>
                </div>

                {/* Adm Unit Details */}
                <div className="job-listing-description">
                    <h3 className="job-listing-title">{name}</h3>

                    {/* Adm Unit Footer */}
                    <div className="job-listing-footer">
                        {/*<ul>
                            <li>
                                {code}
                            </li>
                        </ul>*/}
                    </div>
                </div>

                {/* Adm Unit More Details Button */}
                <span
                    className="list-apply-button ripple-effect">More Details</span>
            </div>
        </a>
        </div>
    );
};

export default AdmUnitCard;