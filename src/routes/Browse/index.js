import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as gisActions from '../../store/gis/actions'
import * as gisSelectors from '../../store/gis/selectors'
import {Map, TileLayer, GeoJSON, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import Modal from 'react-responsive-modal';
import {Doughnut, Bar} from 'react-chartjs-2';

/* Stylesheets */
import './index.css';

/* Containers */
import Header from "../../containers/App/Header/index"
import ContentContainer from "../../containers/App/ContentContainer/index"
import Sidebar from "../../containers/App/Sidebar/index"
import LayerGroup from "react-leaflet/es/LayerGroup";

/* Components */
import VaccineIcon from "../../assets/images/custom/vaccine.svg";

/* Utils */
import gisUtils from '../../utils/gis'
import {Redirect, withRouter} from "react-router-dom";
import chartUtils from '../../utils/charts';


/* Mock Data */
export const healthFacilityPoint = new L.Icon({
    iconUrl: require('../../assets/images/custom/dispensary.svg'),
    iconRetinaUrl: require('../../assets/images/custom/dispensary.svg'),
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
    iconSize: [40, 40],
    shadowUrl: '../assets/marker-shadow.png',
    shadowSize: [29, 40],
    shadowAnchor: [7, 40],
})

class Browse extends Component {
    state = {
        defaultCountry: {
            name: "Kenya",
            code: "KE"
        },
        defaultCounty: {
            name: "Nyandarua",
            code: 18
        },
        haveParentLocation: false,
        haveChildrenLocation: false,
        parent: undefined,
        parentDetails: {
            name: "Parent Name",
            code: "Parent Code",
            level: "Country",
            bcgCount: 0,
            dptCount: 0,
            ttCount: 0,
            opvCount: 0,
            measlesCount: 0,
            yellowFeverCount: 0,
            vitaCount: 0
        },
        showPopup: false,
        popUpContent: {
            lat: 0,
            long: 0,
            name: ""
        },
        parentVaccineTotal: 0,
        children: [],
        clickedOn: 'country',
        zoom: 13,
        open: false,
        modalContent: {
            title: ""
        },
        reqParams: {
            page: 1,
            pageSize: 10,
            params: {},
            fields: "*",
            filterArr: [],
            strategy: "and",
            activePage: this.props.history.location.pathname,
            country: {},
            county: {},
            constituency: {},
            ward: {},
            healthFacility: {}
        },
    };

    onOpenModal = (title) => {
        this.setState({
            open: true,
            modalContent: {
                title: title
            }
        });
    };

    onCloseModal = () => {
        this.setState({
            open: false,
            modalContent: {
                title: ""
            }
        });
    };

    getCountryAndCounties = () => {
        const {reqParams, defaultCountry, defaultCounty} = this.state;
        let countryReqParam = reqParams;
        countryReqParam['country']['id'] = defaultCountry.code;
        countryReqParam['country']['name'] = defaultCountry.name;
        this.props.gisActions.countryRequest(countryReqParam);

        let countyReqParam = reqParams;
        countyReqParam['county']['id'] = defaultCounty.code;
        this.props.gisActions.countyRequest(countyReqParam);
    }

    getCountyAndConstituencies = (county_code, county_name) => {
        const {reqParams} = this.state;
        let countyReqParam;
        let constituencyReqParam;

        countyReqParam = reqParams;
        countyReqParam['county']['id'] = county_code;
        countyReqParam['county']['name'] = county_name;
        this.props.gisActions.countyRequest(countyReqParam);

        constituencyReqParam = reqParams;
        constituencyReqParam['params']['county_cod'] = county_code;
        this.props.gisActions.constituenciesRequest(constituencyReqParam);
    }


    getConstituencyAndWards = (const_code, const_name) => {
        const {reqParams} = this.state;
        let constituencyReqParam;
        let wardReqParam;
        constituencyReqParam = reqParams;
        constituencyReqParam['constituency']['id'] = const_code;
        constituencyReqParam['constituency']['name'] = const_name;
        this.props.gisActions.constituencyRequest(constituencyReqParam);

        wardReqParam = reqParams;
        wardReqParam['params']['const_code'] = const_code;
        this.props.gisActions.wardsRequest(wardReqParam);
    }

    componentWillMount() {
        /*const {reqParams} = this.state;
        let countryReqParam = reqParams;
        countryReqParam['country']['id'] = 'KE';
        this.props.gisActions.countryRequest(countryReqParam);

        let countyReqParam = reqParams;
        countyReqParam['county']['id'] = 18;
        this.props.gisActions.countyRequest(countyReqParam);*/
        this.getCountryAndCounties();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        /* ==============================*/
        /* Tracking Country Request */
        /* ==============================*/
        if (this.props.country !== prevProps.country) {
            const {tracker, timestamp, data} = this.props.country;
            if (tracker.status === 'success') {
                this.setState({
                    parent: data.country,
                    parentDetails: {
                        name: data.country.properties.adm0_en,
                        code: data.country.properties.adm0_pcode,
                        level: "Country",
                        bcgCount: 0,
                        dptCount: 0,
                        ttCount: 0,
                        opvCount: 0,
                        measlesCount: 0,
                        yellowFeverCount: 0,
                        vitaCount: 0
                    },
                    bounds: gisUtils.getAndFitBounds(data.country),
                    haveParentLocation: true,
                });

                this.props.gisActions.resetCountryRequest();

            } else if (tracker.status === 'error') {
                this.props.gisActions.resetCountryRequest();

            } else if (tracker.status === 'processing') {

            }
        }

        /* ==============================*/
        /* Tracking County Request */
        /* ==============================*/
        if (this.props.county !== prevProps.county) {
            const {tracker, timestamp, data} = this.props.county;
            if (tracker.status === 'success') {
                if (this.state.clickedOn === 'county') {
                    this.setState({
                        parent: data.county,
                        parentDetails: {
                            name: data.county.properties.county_nam,
                            code: data.county.properties.county_cod,
                            level: "County",
                            bcgCount: 0,
                            dptCount: 0,
                            ttCount: 0,
                            opvCount: 0,
                            measlesCount: 0,
                            yellowFeverCount: 0,
                            vitaCount: 0
                        },
                        bounds: gisUtils.getAndFitBounds(data.county),
                        haveParentLocation: true
                    });
                } else {
                    this.setState({
                        haveChildrenLocation: true,
                        children: data.county,
                        clickedOn: 'county'
                    });
                }
                this.props.gisActions.resetCountyRequest();

            } else if (tracker.status === 'error') {
                this.props.gisActions.resetCountyRequest();

            } else if (tracker.status === 'processing') {

            }
        }


        /* ==============================*/
        /* Tracking Constituency Request */
        /* ==============================*/
        if (this.props.constituency !== prevProps.constituency) {
            const {tracker, timestamp, data} = this.props.constituency;
            if (tracker.status === 'success') {
                if (this.state.clickedOn === 'constituency') {
                    this.setState({
                        parent: data.constituency,
                        parentDetails: {
                            name: data.constituency.properties.constituen,
                            code: data.constituency.properties.const_code,
                            level: "Constituency",
                            bcgCount: 0,
                            dptCount: 0,
                            ttCount: 0,
                            opvCount: 0,
                            measlesCount: 0,
                            yellowFeverCount: 0,
                            vitaCount: 0
                        },
                        bounds: gisUtils.getAndFitBounds(data.constituency),
                        haveParentLocation: true
                    });
                }
                this.props.gisActions.resetConstituencyRequest();

            } else if (tracker.status === 'error') {
                this.props.gisActions.resetConstituencyRequest();

            } else if (tracker.status === 'processing') {

            }
        }

        /* ==============================*/
        /* Tracking Constituencies Request */
        /* ==============================*/
        if (this.props.constituencies !== prevProps.constituencies) {
            const {tracker, timestamp, data} = this.props.constituencies;

            if (tracker.status === 'success') {
                this.setState({
                    haveChildrenLocation: true,
                    children: data,
                    clickedOn: 'constituency'
                });
                this.props.gisActions.resetConstituenciesRequest();

            } else if (tracker.status === 'error') {
                this.props.gisActions.resetConstituenciesRequest();

            } else if (tracker.status === 'processing') {

            }
        }

        /* ==============================*/
        /* Tracking Ward Request */
        /* ==============================*/
        if (this.props.ward !== prevProps.ward) {
            const {tracker, timestamp, data} = this.props.ward;
            if (tracker.status === 'success') {
                if (this.state.clickedOn === 'ward') {
                    this.setState({
                        parent: data.ward,
                        parentDetails: {
                            name: data.ward.properties.name,
                            code: data.ward.properties.ward_dhis2_id,
                            level: "Ward",
                            bcgCount: 0,
                            dptCount: 0,
                            ttCount: 0,
                            opvCount: 0,
                            measlesCount: 0,
                            yellowFeverCount: 0,
                            vitaCount: 0
                        },
                        bounds: gisUtils.getAndFitBounds(data.ward),
                        haveParentLocation: true
                    });
                }
                this.props.gisActions.resetWardRequest();

            } else if (tracker.status === 'error') {
                this.props.gisActions.resetWardRequest();

            } else if (tracker.status === 'processing') {

            }
        }


        /* ==============================*/
        /* Tracking Wards Request */
        /* ==============================*/
        if (this.props.wards !== prevProps.wards) {
            const {tracker, timestamp, data} = this.props.wards;

            if (tracker.status === 'success') {
                console.log('Here is the ward ', data);
                this.setState({
                    haveChildrenLocation: true,
                    children: data,
                    clickedOn: 'ward'
                });
                this.props.gisActions.resetWardsRequest();

            } else if (tracker.status === 'error') {
                this.props.gisActions.resetWardsRequest();

            } else if (tracker.status === 'processing') {

            }
        }

        /* ==============================*/
        /* Tracking HealthFacilities Request */
        /* ==============================*/
        if (this.props.healthFacilities !== prevProps.healthFacilities) {
            const {tracker, timestamp, data} = this.props.healthFacilities;

            if (tracker.status === 'success') {
                console.log('Here is the healthFacilities ', data);
                this.setState({
                    haveChildrenLocation: true,
                    children: data,
                    clickedOn: 'healthFacility'
                });
                this.props.gisActions.resetHealthFacilitiesRequest();

            } else if (tracker.status === 'error') {
                this.props.gisActions.resetHealthFacilitiesRequest();

            } else if (tracker.status === 'processing') {

            }
        }
    }



    render() {
        console.log("Here is the state ", this.state);
        console.log("Here is the props ", this.props);

        const {popUpContent, showPopup, parentDetails} = this.state;
        return (
            /* Wrapper */
            <div id="wrapper">
                {/* Start of Header */}
                <Header/>
                {/* End of Header */}

                <div className="clearfix"/>

                <div className="full-page-container">

                    {/* Start of Hidden Sidebar */}
                    <Sidebar/>
                    {/* End of Hidden Sidebar */}

                    {/* Start of Content Container*/}
                    <div class="full-page-content-container" data-simplebar>
                        <div class="full-page-content-inner">

                            <h3 class="page-title">Search Results</h3>



                            <div className="row">

                                <div className="col-xl-8">
                                    <div className="dashboard-box main-box-in-row">
                                        <div className="headline">
                                            <h3><i className="icon-feather-bar-chart-2"></i> Vaccine Demand Forecast for 2019</h3>
                                            <div className="sort-by">
                                                <select className="selectpicker hide-tick">
                                                    <option>BCG</option>
                                                    <option>DPT</option>
                                                    <option>Tetanus</option>
                                                    <option>OPV</option>
                                                    <option>Yellow Fever</option>
                                                    <option>Vitamin A</option>
                                                    <option>Measles</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <Bar data={chartUtils.chartsBar1.data}
                                                 options={chartUtils.chartsBar1.options}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="row">
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                                            <a href="javascript:void(0)" onClick={() => this.onOpenModal("BCG")}
                                               className="job-listing margin-top-16">

                                                <div className="job-listing-details">

                                                    {/* Logo */}
                                                    <div className="job-listing-company-logo">
                                                        <img src={VaccineIcon} alt=""/>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="job-listing-description">
                                                        <h4 className="job-listing-company">
                                                            BCG
                                                        </h4>
                                                        <h3 className="job-listing-title">
                                                            {parentDetails.bcgCount}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                                            <a href="javascript:void(0)" onClick={ () => this.onOpenModal("DPT")}
                                               className="job-listing margin-top-16">

                                                <div className="job-listing-details">

                                                    {/* Logo */}
                                                    <div className="job-listing-company-logo">
                                                        <img src={VaccineIcon} alt=""/>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="job-listing-description">
                                                        <h4 className="job-listing-company">
                                                            DPT
                                                        </h4>
                                                        <h3 className="job-listing-title">
                                                            {parentDetails.dptCount}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                                            <a href="javascript:void(0)" onClick={ () => this.onOpenModal("Tetanus")} className="job-listing margin-top-16">

                                                <div className="job-listing-details">

                                                    {/* Logo */}
                                                    <div className="job-listing-company-logo">
                                                        <img src={VaccineIcon} alt=""/>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="job-listing-description">
                                                        <h4 className="job-listing-company">
                                                            Tetanus
                                                        </h4>
                                                        <h3 className="job-listing-title">
                                                            {parentDetails.ttCount}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                                            <a href="javascript:void(0)" onClick={ () => this.onOpenModal("Vitamin A")} className="job-listing margin-top-16">

                                                <div className="job-listing-details">

                                                    {/* Logo */}
                                                    <div className="job-listing-company-logo">
                                                        <img src={VaccineIcon} alt=""/>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="job-listing-description">
                                                        <h4 className="job-listing-company">
                                                            Vitamin A
                                                        </h4>
                                                        <h3 className="job-listing-title">
                                                            {parentDetails.vitaCount}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                                            <a href="javascript:void(0)" onClick={ () => this.onOpenModal("OPV")} className="job-listing margin-top-16">

                                                <div className="job-listing-details">

                                                    {/* Logo */}
                                                    <div className="job-listing-company-logo">
                                                        <img src={VaccineIcon} alt=""/>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="job-listing-description">
                                                        <h4 className="job-listing-company">
                                                            OPV
                                                        </h4>
                                                        <h3 className="job-listing-title">
                                                            {parentDetails.opvCount}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                                            <a href="javascript:void(0)" onClick={ () => this.onOpenModal("Measles")} className="job-listing margin-top-16">

                                                <div className="job-listing-details">

                                                    {/* Logo */}
                                                    <div className="job-listing-company-logo">
                                                        <img src={VaccineIcon} alt=""/>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="job-listing-description">
                                                        <h4 className="job-listing-company">
                                                            Measles
                                                        </h4>
                                                        <h3 className="job-listing-title">
                                                            {parentDetails.measlesCount}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                                            <a href="javascript:void(0)" onClick={ () => this.onOpenModal("Yellow Fever")} className="job-listing margin-top-16">

                                                <div className="job-listing-details">

                                                    {/* Logo */}
                                                    <div className="job-listing-company-logo">
                                                        <img src={VaccineIcon} alt=""/>
                                                    </div>
                                                    {/* Description */}
                                                    <div className="job-listing-description">
                                                        <h4 className="job-listing-company">
                                                            Yellow Fever
                                                        </h4>
                                                        <h3 className="job-listing-title">
                                                            {parentDetails.yellowFeverCount}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Modal open={this.state.open} onClose={this.onCloseModal} style={{padding: 0}} center>
                                <div className="sign-in-form">

                                    <ul className="popup-tabs-nav">
                                        <li><a href="#tab">{this.state.modalContent.title}</a></li>
                                    </ul>

                                    <div className="popup-tabs-container">

                                        <div className="popup-tab-content" id="tab">

                                            <Bar data={chartUtils.chartsBar1.data}
                                                 options={chartUtils.chartsBar1.options}/>
                                        </div>

                                    </div>
                                </div>
                            </Modal>

                            {/* Pagination */}
                            {/*<div class="clearfix"></div>
                            <div class="pagination-container margin-top-20 margin-bottom-20">
                                <nav class="pagination">
                                    <ul>
                                        <li class="pagination-arrow"><a href="#" class="ripple-effect"><i
                                            class="icon-material-outline-keyboard-arrow-left"></i></a></li>
                                        <li><a href="#" class="ripple-effect">1</a></li>
                                        <li><a href="#" class="ripple-effect current-page">2</a></li>
                                        <li><a href="#" class="ripple-effect">3</a></li>
                                        <li><a href="#" class="ripple-effect">4</a></li>
                                        <li class="pagination-arrow"><a href="#" class="ripple-effect"><i
                                            class="icon-material-outline-keyboard-arrow-right"></i></a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="clearfix"></div>*/}
                            {/* Pagination / End */}

                            {/* Footer */}
                            {/*<div class="small-footer margin-top-15">
                                <div class="small-footer-copyrights">
                                    © 2019 <strong>Tabiri</strong>. All Rights Reserved.
                                </div>
                                <ul class="footer-social-links">
                                    <li>
                                        <a href="#" title="Facebook" data-tippy-placement="top">
                                            <i class="icon-brand-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Twitter" data-tippy-placement="top">
                                            <i class="icon-brand-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Google Plus" data-tippy-placement="top">
                                            <i class="icon-brand-google-plus-g"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="LinkedIn" data-tippy-placement="top">
                                            <i class="icon-brand-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>*/}
                            {/* Footer / End */}

                        </div>
                    </div>
                    {/* End of Content Container*/}


                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        countries: gisSelectors.getCountries(state),
        country: gisSelectors.getCountry(state),
        counties: gisSelectors.getCounties(state),
        county: gisSelectors.getCounty(state),
        constituencies: gisSelectors.getConstituencies(state),
        constituency: gisSelectors.getConstituency(state),
        wards: gisSelectors.getWards(state),
        ward: gisSelectors.getWard(state),
        healthFacilities: gisSelectors.getHealthFacilities(state),
        healthFacility: gisSelectors.getHealthFacility(state),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        gisActions: bindActionCreators(gisActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Browse);

// export default withRouter(Browse);
