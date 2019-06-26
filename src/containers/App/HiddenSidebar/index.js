import React, {Component} from 'react';
/* Components */

/* Mock Data */

class HiddenSidebar extends Component {

    render() {

        return (
            <div className="full-page-sidebar hidden-sidebar">
                <div className="full-page-sidebar-inner" data-simplebar>

                    <div className="sidebar-container">
                        <div className="sidebar-widget">
                            <h3>Adm. Unit</h3>
                            <select className="selectpicker default" multiple data-selected-text-format="count"
                                    data-size="7" title="All Adm. Units">
                                <option>Country</option>
                                <option>County</option>
                                <option>Sub County</option>
                                <option>Ward</option>
                                <option>Health Facility</option>
                            </select>
                        </div>

                        <div className="sidebar-widget">
                            <h3>Keywords</h3>
                            <div className="keywords-container">
                                <div className="keyword-input-container">
                                    <input type="text" className="keyword-input" placeholder="e.g. Kenya"/>
                                    <button className="keyword-input-button ripple-effect"><i
                                        className="icon-material-outline-add"/></button>
                                </div>
                                <div className="keywords-list"/>
                                <div className="clearfix"/>
                            </div>
                        </div>

                        <div className="sidebar-widget">
                            <h3>Vaccine Demand (2020)</h3>
                            <div className="margin-top-55"/>

                            <input className="range-slider" type="text" value="" data-slider-currency="$"
                                   data-slider-min="1500" data-slider-max="15000" data-slider-step="100"
                                   data-slider-value="[1500,15000]"/>
                        </div>

                        <div className="sidebar-widget">
                            <h3>Tags</h3>

                            <div className="tags-container">
                                <div className="tag">
                                    <input type="checkbox" id="tag1"/>
                                    <label htmlFor="tag1">keyword: Kenya</label>
                                </div>
                                <div className="tag">
                                    <input type="checkbox" id="tag2"/>
                                    <label htmlFor="tag2">adm. unit: Country</label>
                                </div>
                                <div className="tag">
                                    <input type="checkbox" id="tag3"/>
                                    <label htmlFor="tag3">vaccine demand: $1500 - $15000 </label>
                                </div>
                            </div>
                            <div className="clearfix"/>
                        </div>

                    </div>

                    <div className="sidebar-search-button-container">
                        <button className="button ripple-effect">Search</button>
                    </div>

                </div>
            </div>

        );
    }
}

export default HiddenSidebar;
