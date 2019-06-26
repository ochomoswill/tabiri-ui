import React, {Component} from 'react';
import tabiriLogo from '../../../assets/images/logo/colored.svg'
import reportIcon from "../../../assets/images/custom/report.svg";
/* Components */

/* Mock Data */

class Header extends Component {

    render() {

        return (
            <header id="header-container" className="fullwidth not-sticky">
                <div id="header">
                    <div className="container">

                        <div className="left-side">

                            <div id="logo">
                                <a href="index-2.html"><img src={tabiriLogo} alt=""/></a>
                            </div>

                            <nav id="navigation">
                                <ul id="responsive">

                                    <li>
                                        {/*<Link to="/browse">*/}
                                        <a href="/browse">Home</a>
                                        <ul className="dropdown-nav">
                                            {/*<li><a href="index-2.html">Home 1</a></li>
                                            <li><a href="index-3.html">Home 2</a></li>
                                            <li><a href="index-4.html">Home 3</a></li>*/}
                                        </ul>
                                        {/*</Link>*/}
                                    </li>

                                    <li>
                                        {/*<Link to="/home">*/}
                                        <a href="/home">Browse Map</a>
                                        <ul className="dropdown-nav">
                                            {/*<li><a href="index-2.html">Home 1</a></li>
                                            <li><a href="index-3.html">Home 2</a></li>
                                            <li><a href="index-4.html">Home 3</a></li>*/}
                                        </ul>
                                        {/*</Link>*/}
                                    </li>

                                </ul>
                            </nav>
                            <div className="clearfix"/>

                        </div>


                        {/* Right Side Content / End */}
                        <div class="right-side">

                            {/* User Menu */}
                            <div class="header-widget">

                                {/* Messages */}
                                <div class="header-notifications user-menu">
                                    <div class="header-notifications-trigger">
                                        <a href="#">
                                            <div class="user-avatar"><img
                                                src={reportIcon} alt=""/></div>
                                        </a>
                                    </div>
                                </div>

                            </div>
                            {/* User Menu / End */}

                            {/* Mobile Navigation Button */}
                            <span class="mmenu-trigger">
                                <button class="hamburger hamburger--collapse" type="button">
                                    <span class="hamburger-box">
                                        <span class="hamburger-inner"></span>
                                    </span>
                                </button>
                            </span>

                        </div>
                        {/* Right Side Content / End */}

                    </div>
                </div>

            </header>

    );
    }
    }

    export default Header;
