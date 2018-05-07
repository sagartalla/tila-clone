import React, { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import NoSSR from "react-no-ssr";
import makeStore from "../store";
import Layout from "../layout/main";
import Cam from "../components/Cam";

const CamPage = () => (
  <NoSSR>
    <Cam />
  </NoSSR>
);
const mapStateToProps = state => ({
  allState: state
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(
  CamPage
);
