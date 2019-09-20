import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Parser } from 'html-to-react';
import { bindActionCreators } from "redux";
import lang from '../../utils/language';
import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';

import styles from './policy.styl';

const parser = new Parser();

import { selectors } from "../../store/landing";

const Policy = ({ query, pageData }) => {
  return (
    <Fragment>
      <HeaderBar />
      <div className={styles["policy-wrapper"]}>
      {
        parser.parse(pageData[lang].HTMLString)
      }
      </div>
      <FooterBar />
    </Fragment>
  );
};

const mapStateToProps = store => ({
	pageData: selectors.getPolicy(store)
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Policy);
