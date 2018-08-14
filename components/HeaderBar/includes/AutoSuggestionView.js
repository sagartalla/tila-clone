import React, { Component } from "react";
import { mergeCss } from "../../../utils/cssUtil";
import PropTypes from "prop-types";
import {languageDefinations} from '../../../utils/lang';
const styles = mergeCss("components/HeaderBar/header");
const {HEADER_PAGE} = languageDefinations()
export default class AutoSuggestionView extends Component {
  constructor(props) {
    super(props);
    this.autoCompleteRef = React.createRef();
    this.handleOutSideClick = this.handleOutSideClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutSideClick);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutSideClick);
  }
  handleOutSideClick(e) {
    if (
      this.autoCompleteRef &&
      !this.autoCompleteRef.current.contains(e.target)
    ) {
      this.props.closeAutoComplete();
    }
  }
  renderData(data) {
    const uiData = data.map(data => {
      return <li key={data.id}>{data.value}</li>;
    });

    return <ul>{uiData}</ul>;
  }
  render() {
    const { autoData } = this.props;
    return (
      <div className={styles["auto-complete"]} ref={this.autoCompleteRef}>
        <div>
          <h4>{HEADER_PAGE.MATCHING_ITEM}</h4>
          {autoData.suggestions.length > 0 && this.renderData(autoData.suggestions)}
        </div>
        <div>
          <h4>{HEADER_PAGE.MATCHING_PRODUCTS}</h4>
          {autoData.recommendedProducts.length > 0 && this.renderData(autoData.recommendedProducts)}
        </div>
      </div>
    );
  }
}

AutoSuggestionView.propTypes = {
  closeAutoComplete: PropTypes.func,
  autoData: PropTypes.Array
};
