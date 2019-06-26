import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as gisActions from '../../store/gis/actions'
import * as gisSelectors from '../../store/gis/selectors'
import {Map, TileLayer, GeoJSON, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import Modal from 'react-responsive-modal';

/* Stylesheets */
import './index.css';

/* Containers */
import Header from "../../containers/App/Header/index"
import ContentContainer from "../../containers/App/ContentContainer/index"
import HiddenSidebar from "../../containers/App/HiddenSidebar/index"
import LayerGroup from "react-leaflet/es/LayerGroup";

/* Components */

/* Utils */
import gisUtils from '../../utils/gis'
import {Redirect, withRouter} from "react-router-dom";


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

class Menu extends Component {
    state = {
        open: false,
        modalContent: {
            title: ""
        },
        bounds: [
            [-0.027709632999972, 33.910288655],
            [0.778068243000064, 33.910288655],
            [0.778068243000064, 34.434631172],
            [-0.027709632999972, 34.434631172],
            [-0.027709632999972, 33.910288655]
        ],
        defaultCountry:{
            name: "Kenya",
            code: "KE"
        },
        defaultCounty:{
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
            lat:0,
            long: 0,
            name: ""
        },
        parentVaccineTotal:0,
        children: [],
        clickedOn: 'country',
        zoom: 13,
        open: false,
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

    style(feature, layer) {
        return {
            // the fillColor is adapted from a property which can be changed by the user (segment)
            fillColor: 'yellow',
            weight: 0.7,
            //stroke-width: to have a constant width on the screen need to adapt with scale
            opacity: 1,
            color: 'red',
            dashArray: '1',
            fillOpacity: 0.4
        };
    };

    onEachFeature = (feature, layer) => {
        layer.on({
            /*mouseover: this.highlightFeature.bind(this),
            mouseout: this.resetHighlight.bind(this),*/
            click: this.clickToFeature,
            onMouseOver: this.showPopup,
            onMouseOut: this.closePopup
        })
    };

    showPopup = (e) => {
        let layer = e;
        console.log("I hovered on ", layer);
    };

    closePopup = (e) => {

    };

    getCountryAndCounties = () => {
        const {reqParams,defaultCountry, defaultCounty} = this.state;
        let countryReqParam = reqParams;
        countryReqParam['country']['id'] = defaultCountry.code;
        countryReqParam['country']['name'] = defaultCountry.name;
        this.props.gisActions.countryRequest(countryReqParam);

        let countyReqParam = reqParams;
        countyReqParam['county']['id'] = defaultCounty.code;
        this.props.gisActions.countyRequest(countyReqParam);
    }

    onClickCountryBreadcrumb = () => {
        let reqParams = this.state.reqParams;
        delete reqParams["county"].name
        reqParams["constituency"] = {}
        reqParams["ward"] = {}
        this.getCountryAndCounties()
        this.setState({
            clickedOn: 'country',
            haveParentLocation: false,
            haveChildrenLocation: false,
            reqParams
        })
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

    onClickCountyBreadcrumb = () => {
        let reqParams = this.state.reqParams;
        delete reqParams["constituency"].name
        reqParams["ward"] = {}
        this.getCountyAndConstituencies(
            reqParams.county.id,
            reqParams.county.name
        )
        this.setState({
            clickedOn: 'county',
            haveParentLocation: false,
            haveChildrenLocation: false,
            reqParams
        })
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

    onClickConstituencyBreadcrumb = () => {
        let reqParams = this.state.reqParams;
        delete reqParams["ward"].name
        this.getConstituencyAndWards(
            reqParams.constituency.id,
            reqParams.constituency.name
        )
        this.setState({
            clickedOn: 'constituency',
            haveParentLocation: false,
            haveChildrenLocation: false,
            reqParams
        })
    }

    clickToFeature = (e) => {
        const {clickedOn, reqParams} = this.state;
        let layer = e.target;
        console.log("I clicked on ", layer.feature.properties);
        /*let countyReqParam;
        let constituencyReqParam;*/
        let wardReqParam;
        let healthFacilityReqParam;


        if (clickedOn === 'county') {
            this.getCountyAndConstituencies(
                layer.feature.properties.county_cod,
                layer.feature.properties.county_nam
            );
            /*countyReqParam = reqParams;
            countyReqParam['county']['id'] = layer.feature.properties.county_cod;
            this.props.gisActions.countyRequest(countyReqParam);

            constituencyReqParam = reqParams;
            constituencyReqParam['params']['county_cod'] = layer.feature.properties.county_cod;
            this.props.gisActions.constituenciesRequest(constituencyReqParam);*/
        }

        if (clickedOn === 'constituency') {
            this.getConstituencyAndWards(
                layer.feature.properties.const_code,
                layer.feature.properties.constituen
            )
            /*constituencyReqParam = reqParams;
            constituencyReqParam['constituency']['id'] = layer.feature.properties.const_code;
            this.props.gisActions.constituencyRequest(constituencyReqParam);

            wardReqParam = reqParams;
            wardReqParam['params']['const_code'] = layer.feature.properties.const_code;
            this.props.gisActions.wardsRequest(wardReqParam);*/
        }

        if (clickedOn === 'ward') {
            wardReqParam = reqParams;
            wardReqParam['ward']['id'] = layer.feature.properties.objectid;
            wardReqParam['ward']['name'] = layer.feature.properties.name;
            this.props.gisActions.wardRequest(wardReqParam);

            healthFacilityReqParam = reqParams;
            healthFacilityReqParam['params']['dhis2parentid'] = layer.feature.properties.ward_dhis2_id;
            this.props.gisActions.healthFacilitiesRequest(healthFacilityReqParam);
        }


        this.setState({
            haveParentLocation: false,
            haveChildrenLocation: false
        });

    };

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
                if (this.state.clickedOn === 'ward' || this.state.clickedOn === 'healthFacility' ) {
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

    onMouseOut = (e) => {
        this.setState({
            popUpContent: {
                lat:0,
                long:0,
                name:""
            },
            showPopup:false
        })
    }

    onMouseOver = (e) => {
        const {clickedOn} = this.state;
        // console.log('onMouseOver', e)
        let lat;
        let long;
        let content;
        // console.log('onMouseOut', e);
        if (clickedOn === 'county') {
            content = e.layer.feature.properties.county_nam;
        }

        if (clickedOn === 'constituency') {
            content = e.layer.feature.properties.constituen;
        }

        if (clickedOn === 'ward') {
            content = e.layer.feature.properties.name;
        }

        this.setState({
            popUpContent: {
                lat:e.latlng.lat,
                long:e.latlng.lng,
                name:content
            },
            showPopup:true
        })
    }

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

    render() {
        console.log("Here is the state ", this.state);
        console.log("Here is the props ", this.props);

        const {popUpContent, showPopup} = this.state;
        return (
            /* Wrapper */
            <div id="wrapper">





                {/* Start of Header */}
                <Header/>
                {/* End of Header */}

                <div className="clearfix"/>

                <div className="full-page-container with-map">

                    {/* Start of Hidden Sidebar */}
                    <HiddenSidebar/>
                    {/* End of Hidden Sidebar */}

                    {/* Start of Content Container*/}
                    <ContentContainer
                        parent={this.state.parent}
                        children={this.state.children}
                        parentDetails={this.state.parentDetails}
                        parentVaccineTotal={this.state.parentVaccineTotal}
                        reqParams={this.state.reqParams}
                        onClickCountryBreadcrumb={this.onClickCountryBreadcrumb}
                        onClickCountyBreadcrumb={this.onClickCountyBreadcrumb}
                        onClickConstituencyBreadcrumb={this.onClickConstituencyBreadcrumb}
                        clickedOn={this.state.clickedOn}
                    />
                    {/* End of Content Container*/}


                    <div className="full-page-map-container">

                        <a href="javascript:void(0)" className={"parent-details-label"}>
                            {`${this.state.parentDetails.name.toUpperCase()} ${this.state.parentDetails.level.toUpperCase()}`}
                        </a>

                        {/*<div className="filter-button-container">
                            <button className="enable-filters-button">
                                <i className="enable-filters-button-icon"/>
                                <span className="show-text">Show Filters</span>
                                <span className="hide-text">Hide Filters</span>
                            </button>
                            <div className="filter-button-tooltip">Click to expand sidebar with filters!</div>
                        </div>*/}

                        <div id="map">
                            <Map bounds={this.state.bounds}
                                 zoom={this.state.zoom}
                                 doubleClickZoom={false}
                                 closePopupOnClick={false}
                                 dragging={false}
                                 zoomSnap={false}
                                 zoomDelta={false}
                                 trackResize={false}
                                 touchZoom={false}
                                 scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                />
                                {
                                    this.state.haveParentLocation && this.state.haveChildrenLocation ? (
                                        <LayerGroup>
                                            <GeoJSON
                                                data={this.state.parent}
                                            />
                                            <GeoJSON
                                                data={this.state.children}
                                                style={this.style}
                                                onEachFeature={this.onEachFeature}
                                                onMouseOut={this.onMouseOut}
                                                onMouseOver={this.onMouseOver}
                                            />

                                            {
                                                showPopup ?
                                                    (
                                                            <Popup
                                                                position={[popUpContent.lat, popUpContent.long]}
                                                            >
                                                                <span>{popUpContent.name}</span>
                                                            </Popup>
                                                    )
                                                    : null
                                            }

                                            {
                                                this.state.clickedOn === 'healthFacility' ?
                                                    this.state.children !== undefined ?
                                                        this.state.children.map((child, idx) =>
                                                            <Marker key={`marker-${idx}`}
                                                                    icon={healthFacilityPoint}
                                                                    position={[child.lat, child.long]}>
                                                                <Popup>
                                                                    <span>{child.orgunitname}</span>
                                                                </Popup>
                                                            </Marker>
                                                        ) : null
                                                    : null
                                            }
                                        </LayerGroup>
                                    ) : null
                                }

                            </Map>



                        </div>
                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

// export default withRouter(Menu);
