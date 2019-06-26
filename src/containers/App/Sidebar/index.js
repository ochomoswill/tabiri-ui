import React, {Component} from 'react';
import Select from 'react-select';
/* Components */

/* Mock Data */
const options = [
    { value: 18, label: 'Nyandarua' },
];

class Sidebar extends Component {
    state = {
        selectedCounty: null,
        selectedConstituency: null,
        selectedWard: null,
        selectedHealthFacility: null,
    };

    handleCountyChange = selectedCounty => {
        this.setState({ selectedCounty });
        console.log(`Option selected:`, selectedCounty);
    };

    handleConstituencyChange = selectedConstituency => {
        this.setState({ selectedConstituency });
        console.log(`Option selected:`, selectedConstituency);
    };

    handleWardChange = selectedWard => {
        this.setState({ selectedWard });
        console.log(`Option selected:`, selectedWard);
    };

    handleHealthFacilityChange = selectedHealthFacility => {
        this.setState({ selectedHealthFacility });
        console.log(`Option selected:`, selectedHealthFacility);
    };

    render() {
        const { selectedCounty, selectedConstituency, selectedWard, selectedHealthFacility } = this.state;

        return (
            <div className="full-page-sidebar">
                <div className="full-page-sidebar-inner" data-simplebar>

                    <div className="sidebar-container">
                        <div className="sidebar-widget">
                            <h3>County</h3>
                            <Select
                                value={selectedCounty}
                                onChange={this.handleCountyChange}
                                options={options}
                            />
                        </div>

                        <div className="sidebar-widget">
                            <h3>Constituency</h3>
                            <Select
                                value={selectedConstituency}
                                onChange={this.handleConstituencyChange}
                                options={options}
                            />
                        </div>

                        <div className="sidebar-widget">
                            <h3>Ward</h3>
                            <Select
                                value={selectedWard}
                                onChange={this.handleWardChange}
                                options={options}
                            />
                        </div>

                        <div className="sidebar-widget">
                            <h3>Health Facility</h3>
                            <Select
                                value={selectedHealthFacility}
                                onChange={this.handleHealthFacilityChange}
                                options={options}
                            />
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

export default Sidebar;
