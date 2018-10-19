import React, { Component } from "react";
import "./App.css";
import SmurfList from "./SmurfList";
import SmurfForm from "./SmurfForm";
import { connect } from "react-redux";
import { getSmurfs } from "../actions";
import { Container } from "reactstrap";
import { Auth0Lock } from 'auth0-lock';

/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own. 
 Just remember, `how do I connect my components to redux?`
 `How do I ensure that my component links the state to props?`
 */

const lock = new Auth0Lock(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_DOMAIN_URL
);

class App extends Component {
  render() {
    document.body.style.background = "#88CCFF";
    return (
      <Container className="my-5 p-5">
        <h1 className="header">SMURF VILLAGE</h1>
        <SmurfList />
        <SmurfForm />
        <div type="button" onClick={() => lock.show()}>
          Log In
        </div>
      </Container>
    );
  }

  componentDidMount() {
    this.props.getSmurfs();
  }
}

export default connect(
  null,
  { getSmurfs }
)(App);
