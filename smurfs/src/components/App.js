import React, { Component } from "react";
import "./App.css";
import SmurfList from "./SmurfList";
import SmurfForm from "./SmurfForm";
import { connect } from "react-redux";
import { getSmurfs } from "../actions";
import { Container } from "reactstrap";
import { Auth0Lock } from 'auth0-lock';
import auth0 from 'auth0-js';

/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own. 
 Just remember, `how do I connect my components to redux?`
 `How do I ensure that my component links the state to props?`
 */

const lock = new Auth0Lock(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_DOMAIN_URL,
);

var webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_DOMAIN_URL,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: 'http://localhost:9000'
});

webAuth.parseHash((err, authResult) => {
  if (authResult) {
    console.log("authResult", authResult);
    // Save the tokens from the authResult in local storage or a cookie
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("expires_at", expiresAt);
  }
  else if (err) {
    // Handle errors
    console.log(err);
  }
});

class App extends Component {
  render() {
    document.body.style.background = "#88CCFF";
    if (this.isAuthenticated()) {
      return (
        <Container className="my-5 p-5">
          <h1 className="header">SMURF VILLAGE</h1>
          <SmurfList />
          <SmurfForm />
        </Container>
      );
    }
    else {
      return (
        <div>
          <h1>You are not logged in</h1>
          <div type="button" onClick={() => lock.show()}>
            Log In
          </div>
        </div>
      )
    }
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  componentDidMount() {
    this.props.getSmurfs();
  }
}


export default connect(
  null,
  { getSmurfs }
)(App);
