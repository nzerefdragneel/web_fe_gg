import React, { Component } from "react";
import { withRouter } from '../common/with-router';
class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="">
                    Homepage
                </h1>
            </div>
        )
    }
}
export default withRouter(Home);

