import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addUrlProps,
  UrlQueryParamTypes,
  pushInUrlQuery
} from "react-url-query";
import { actionCreators, selectors } from "../../store/search";
import { Router } from "../../routes";
import SVGComponent from "../common/SVGComponet";
import _ from "lodash";
import AutoSuggestionView from "./includes/AutoSuggestionView";

import { mergeCss } from "../../utils/cssUtil";
const styles = mergeCss("components/HeaderBar/header");

const urlPropsQueryConfig = {
  searchText: { type: UrlQueryParamTypes.string, queryParam: "search" }
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query || "",
      autoClose: true
    };
    this.submitQuery = this.submitQuery.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.closeAutoComplete = this.closeAutoComplete.bind(this);
  }

  submitQuery(e) {
    e.preventDefault();
    const flushFilters = true;
    Router.pushRoute(
      `/srp?search=${this.state.query}&${Object.entries(
        this.props.optionalParams
      )
        .map(([key, val]) => `${key}=${val}`)
        .join("&")}`
    );
  }
  reqAutoComplete = _.debounce(term => {
    this.props.autoCompleteSuggestion(term);
  }, 500);

  onChangeSearchInput(e) {
    const { value } = e.target;
    this.setState({
      query: value,
      autoClose: false
    });
    this.reqAutoComplete(value);
  }
  closeAutoComplete() {
    this.setState({ autoClose: true });
  }
  render() {
    const { autoCompletedata } = this.props;
    const { query, autoClose } = this.state;
    return (
      <div className={styles["search-wrapper"]}>
        <form onSubmit={this.submitQuery}>
          <input
            className={styles["search-input"]}
            placeholder="Search your fav item..."
            onChange={this.onChangeSearchInput}
            value={query}
          />
          {
            {
              ["true-false"]: (
                <AutoSuggestionView
                  autoData={autoCompletedata}
                  closeAutoComplete={this.closeAutoComplete}
                />
              ),
              ["false-false"]: null
            }[
              `${autoCompletedata.suggestions &&
                autoCompletedata.suggestions.length > 0}-${autoClose}`
            ]
          }
          <button type="submit" className={styles["search-btn"]}>
            <SVGComponent
              clsName={`${styles["searching-icon"]}`}
              src="icons/search/search-white-icon"
            />
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  getSearchResults: PropTypes.func,
  searchText: PropTypes.string,
  onChangeSearchText: PropTypes.func
};

const mapStateToProps = store => ({
  query: selectors.getQuery(store),
  optionalParams: selectors.optionParams(store),
  autoCompletedata: selectors.autoCompleteData(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
      autoCompleteSuggestion: actionCreators.autoCompleteSuggestion
    },
    dispatch
  );

export default addUrlProps({ urlPropsQueryConfig })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
