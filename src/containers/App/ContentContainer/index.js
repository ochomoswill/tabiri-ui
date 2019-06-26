import React, {Component} from 'react';
import VaccineIcon from "../../../assets/images/custom/vaccine.svg";
import LocationOnMapIcon from "../../../assets/images/custom/location_on_map.svg";
import LocationIcon from "../../../assets/images/custom/location.svg";
/*import Modal from "../../../components/Modal";*/
import AdmUnitCard from "../../../components/AdmUnitCard";
import StringUtils from "../../../utils/strings"
import Modal from 'react-responsive-modal';
import chartUtils from '../../../utils/charts';

import {Doughnut, Bar} from 'react-chartjs-2';
/* Components */

/* Stylesheets */
import './index.css';

/* Mock Data */

class ContentContainer extends Component {
    state = {
        open: false,
        modalContent: {
            title: ""
        }
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

    showModal = () => {
        this.setState({show: true});
    };

    hideModal = () => {
        this.setState({show: false});
    };

    render() {

        const {parent, children, parentDetails, parentVaccineTotal, reqParams, clickedOn} = this.props;

        return (
            <div className="full-page-content-container" data-simplebar="">
                <div className="full-page-content-inner">

                    {/*<h3 className="page-title">Country Statistics of year <stron g>2020</strong></h3>*/}
                    <div className="row">
                        <div className="col-xl-12 margin-bottom-10">
                            <h3>Vaccine Demand at <strong>{parentDetails.level}</strong> Level</h3>
                            {/* Breadcrumbs */}
                            <nav id="breadcrumbs">
                                <ul>
                                    {
                                        reqParams.country.hasOwnProperty("name") ?
                                            !reqParams.county.hasOwnProperty("name") ?
                                                (
                                                    <li>
                                                        {StringUtils.titleCase(reqParams.country.name)}
                                                    </li>
                                                )
                                                : (
                                                    <li>
                                                        <a href="javascript:void(0)"
                                                           onClick={this.props.onClickCountryBreadcrumb}>
                                                            {StringUtils.titleCase(reqParams.country.name)}
                                                        </a>
                                                    </li>
                                                )
                                            : null
                                    }
                                    {
                                        reqParams.county.hasOwnProperty("name") ?
                                            !reqParams.constituency.hasOwnProperty("name") ?
                                                (
                                                    <li>
                                                        {StringUtils.titleCase(reqParams.county.name)}
                                                    </li>
                                                )
                                                : (
                                                    <li>
                                                        <a href="javascript:void(0)"
                                                           onClick={this.props.onClickCountyBreadcrumb}>
                                                            {StringUtils.titleCase(reqParams.county.name)}
                                                        </a>
                                                    </li>
                                                )
                                            : null
                                    }
                                    {
                                        reqParams.constituency.hasOwnProperty("name") ?
                                            !reqParams.ward.hasOwnProperty("name") ?
                                                (
                                                    <li>
                                                        {StringUtils.titleCase(reqParams.constituency.name)}
                                                    </li>
                                                )
                                                : (
                                                    <li>
                                                        <a href="javascript:void(0)"
                                                           onClick={this.props.onClickConstituencyBreadcrumb}>
                                                            {StringUtils.titleCase(reqParams.constituency.name)}
                                                        </a>
                                                    </li>
                                                )
                                            : null
                                    }
                                    {
                                        reqParams.ward.hasOwnProperty("name") ?
                                            (
                                                <li>
                                                    {StringUtils.titleCase(reqParams.ward.name)}
                                                </li>
                                            ) : null
                                    }

                                    {/*<li><a href="javascript:void(0)">Nyandarua</a></li>
                                    <li><a href="javascript:void(0)">Kipipiri</a></li>
                                    <li>Kipipiri</li>*/}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">


                            <a href="javascript:void(0)" className="job-listing margin-top-20">

                                <div className="job-listing-details">

                                    {/* Logo */}
                                    <div className="job-listing-company-logo">
                                        <img src={LocationOnMapIcon} alt=""/>
                                    </div>
                                    {/* Description */}
                                    <div className="job-listing-description">
                                        <h4 className="job-listing-company">
                                            {parentDetails.code}
                                        </h4>
                                        <h3 className="job-listing-title">
                                            {`${parentDetails.name.toUpperCase()} ${parentDetails.level.toUpperCase()}`}
                                        </h3>
                                    </div>

                                    {/* Additional Float-Right Info */}
                                    <ul className="intro-stats margin-top-15 hide-under-992px">
                                        <li>
                                            <strong className="counter">
                                                {parseInt(parentVaccineTotal)}
                                            </strong>
                                            <span>Total Vaccines</span>
                                        </li>
                                    </ul>
                                </div>
                            </a>


                            <div className="tabs">
                                <div className="tabs-header">
                                    <ul>
                                        <li className="active"><a href="#tab-1" data-tab-id="1">Vaccine Demand</a></li>
                                        <li><a href="#tab-2" data-tab-id="2">Adm Unit Info</a></li>
                                        {/*<li><a href="#tab-3" data-tab-id="3">Tab 3</a></li>*/}
                                    </ul>
                                    <div className="tab-hover"/>
                                    <nav className="tabs-nav">
                                        <span className="tab-prev"><i
                                            className="icon-material-outline-keyboard-arrow-left"/></span>
                                        <span className="tab-next"><i
                                            className="icon-material-outline-keyboard-arrow-right"/></span>
                                    </nav>
                                </div>
                                {/* Tab Content */}
                                <div className="tabs-content">
                                    <div className="tab active" data-tab-id="1">
                                        <p>Below is the forecast of child vaccine demand in the country for 2020.</p>

                                        <div className="notification notice closeable margin-top-15">
                                            <p>Please check the information below</p>
                                            <a className="close" href="#"></a>
                                        </div>

                                        <div className="row">
                                            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
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
                                            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
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
                                            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
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
                                        </div>
                                        <div className="row">
                                            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
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
                                            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
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
                                            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
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
                                        <div className="row">
                                            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
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
                                        {/*<table className="basic-table">
                                            <tr>
                                                <th>Vaccine Name</th>
                                                <th>Vaccine Demand</th>
                                            </tr>

                                            <tr>
                                                <td data-label="Vaccine Name">BCG</td>
                                                <td data-label="Vaccine Demand">12,000</td>
                                            </tr>

                                            <tr>
                                                <td data-label="Vaccine Name">DPT</td>
                                                <td data-label="Vaccine Demand">12,000</td>
                                            </tr>

                                            <tr>
                                                <td data-label="Vaccine Name">Tetanus</td>
                                                <td data-label="Vaccine Demand">12,000</td>
                                            </tr>

                                            <tr>
                                                <td data-label="Vaccine Name">Measles</td>
                                                <td data-label="Vaccine Demand">12,000</td>
                                            </tr>

                                            <tr>
                                                <td data-label="Vaccine Name">OPV</td>
                                                <td data-label="Vaccine Demand">12,000</td>
                                            </tr>

                                            <tr>
                                                <td data-label="Vaccine Name">Yellow Fever</td>
                                                <td data-label="Vaccine Demand">12,000</td>
                                            </tr>

                                            <tr>
                                                <td data-label="Vaccine Name">Vit A</td>
                                                <td data-label="Vaccine Demand">12,000</td>
                                            </tr>

                                        </table>*/}
                                    </div>
                                    <div className="tab" data-tab-id="2">
                                        <p>The country consists of the following Adm. Units .</p>

                                        {
                                            clickedOn === "country" ?
                                                children !== undefined ?
                                                    (
                                                        <AdmUnitCard
                                                            name={"At Country Unit"}
                                                            code={12}
                                                        />
                                                    )
                                                    : null
                                                : null
                                        }

                                        {
                                            clickedOn === "county" ?
                                                children !== undefined ?
                                                    children.properties !== undefined ?
                                                        (
                                                            <AdmUnitCard
                                                                name={children.properties.county_nam}
                                                                code={children.properties.county_cod}
                                                            />
                                                        ) : null
                                                    : null
                                                : null
                                        }

                                        {
                                            clickedOn === "constituency" ?
                                                children !== undefined ?
                                                    children.features !== undefined ?
                                                        children.features.map((child, key) =>
                                                            <AdmUnitCard
                                                                key={key}
                                                                name={child.properties !== undefined ? child.properties.constituen: null}
                                                                code={child.properties !== undefined ? child.properties.const_code : null}
                                                            />)
                                                        : null
                                                    : null
                                                : null
                                        }

                                        {
                                            clickedOn === "ward" ?
                                                children !== undefined ?
                                                    children.features !== undefined ?
                                                        children.features.map((child, key) =>
                                                            <AdmUnitCard
                                                                key={key}
                                                                name={child.properties !== undefined ? child.properties.name : null}
                                                                code={child.properties !== undefined ? child.properties.objectid : null}
                                                            />)
                                                        : null
                                                    : null
                                                : null
                                        }

                                        {
                                            clickedOn === "healthFacility" ?
                                                children !== undefined ?
                                                    children.map((child, key) =>
                                                        <AdmUnitCard
                                                            key={key}
                                                            name={child.orgunitname}
                                                            code={child.ward_dhis2_id}
                                                        />)
                                                    : null
                                                : null
                                        }


                                        {/* Adm Unit Container/ End */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="clearfix"/>



                    {/* Modal */}
                    <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">

                        <div className="sign-in-form">

                            <ul className="popup-tabs-nav">
                                <li><a href="#tab">BCG</a></li>
                            </ul>

                            <div className="popup-tabs-container">

                                <div className="popup-tab-content" id="tab">

                                    <div className="welcome-text">
                                        <h3>Attach File With CV</h3>
                                    </div>

                                    <form method="post" id="apply-now-form">

                                        <div className="input-with-icon-left">
                                            <i className="icon-material-outline-account-circle"/>
                                            <input type="text" className="input-text with-border" name="name" id="name"
                                                   placeholder="First and Last Name" required/>
                                        </div>

                                        <div className="input-with-icon-left">
                                            <i className="icon-material-baseline-mail-outline"/>
                                            <input type="text" className="input-text with-border" name="emailaddress"
                                                   id="emailaddress" placeholder="Email Address" required/>
                                        </div>

                                        <div className="uploadButton">
                                            <input className="uploadButton-input" type="file"
                                                   accept="image/*, application/pdf" id="upload-cv"/>
                                            <label className="uploadButton-button ripple-effect" for="upload-cv">Select
                                                File</label>
                                            <span className="uploadButton-file-name">Upload your CV / resume relevant file. <br/> Max. file size: 50 MB.</span>
                                        </div>

                                    </form>

                                    <button
                                        className="button margin-top-35 full-width button-sliding-icon ripple-effect"
                                        type="submit" form="apply-now-form">
                                        Apply Now <i className="icon-material-outline-arrow-right-alt"/></button>
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

                    {/*<div className="small-footer margin-top-15">
                        <div className="small-footer-copyrights">
                            © 2019 <strong>Tabiri</strong>. All Rights Reserved.
                        </div>
                        <ul className="footer-social-links">
                            <li>
                                <a href="#" title="Facebook" data-tippy-placement="top">
                                    <i className="icon-brand-facebook-f"/>
                                </a>
                            </li>
                            <li>
                                <a href="#" title="Twitter" data-tippy-placement="top">
                                    <i className="icon-brand-twitter"/>
                                </a>
                            </li>
                            <li>
                                <a href="#" title="Google Plus" data-tippy-placement="top">
                                    <i className="icon-brand-google-plus-g"/>
                                </a>
                            </li>
                            <li>
                                <a href="#" title="LinkedIn" data-tippy-placement="top">
                                    <i className="icon-brand-linkedin-in"/>
                                </a>
                            </li>
                        </ul>
                        <div className="clearfix"/>
                    </div>*/}

                </div>
            </div>

        );
    }
}

export default ContentContainer;
