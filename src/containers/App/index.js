import React, {Component, Fragment} from 'react';
import App from "../../routes/index"
/* Components */

/* Mock Data */

class MainApp extends Component {
    render() {
        const {match} = this.props;
        console.log("Match is ", match);
        return (
            <Fragment>
                <App match={match}/>
            </Fragment>
        );
    }
}

export default MainApp;
