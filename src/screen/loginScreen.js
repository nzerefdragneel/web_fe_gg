import React, { Component } from "react";
import { Card, Typography } from "@material-tailwind/react";

import { withRouter } from "../common/with-router";
import LoginComponent from "../components/login.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

class LoginScreen extends Component {
  render() {
    return (
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 flex items-center">
          <div className="mx-auto">
            <Typography variant="h1" className="text-dark-green">
              Classroom
            </Typography>
            <Typography variant="h3">
              Where teaching and learning come together
            </Typography>
            <Typography>
              Classroom helps educators create engaging learning experiences
              they can personalize, manage, and measure. Classroom is a
              Workspace for Education, which empowers your institution with
              simple, safe, and collaborative tools.
            </Typography>
          </div>
        </div>

        <div className="col-span-5 flex items-center justify-center">
          <Card className="py-12 px-2 w-full flex items-center justify-center shadow rounded">
            <Typography variant="h2" color="black">
              Login
            </Typography>
            <Typography>
              Welcome back! Please log in to access your account.
            </Typography>
            <LoginComponent />
            <Typography>
              Don't have an account?{" "}
              {
                <a href="/signup" style={{ color: "black" }}>
                  Sign up
                </a>
              }{" "}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Typography>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginScreen);
