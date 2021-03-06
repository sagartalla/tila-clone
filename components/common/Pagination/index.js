import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { languageDefinations } from '../../../utils/lang/';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './pagination_en.styl';
import styles_ar from './pagination_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const LEFT_PAGE = 'LEFT_PAGE'
const RIGHT_PAGE = 'RIGHT_PAGE'

const { PERSONAL_INFO_MODAL } = languageDefinations();

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state={
      currentPage:this.props.currentPage
    }

    this.handleMoveRight = this.handleMoveRight.bind(this)
    this.handleMoveLeft = this.handleMoveLeft.bind(this)
    this.goToPage = this.goToPage.bind(this)
  }

  handleMoveLeft(e) {
    e.preventDefault()
    this.goToPage(this.state.currentPage - this.props.pageNeighbours * 2 - 1)
  }
  handleMoveRight(e) {
    e.preventDefault()
    this.goToPage(this.state.currentPage + this.props.pageNeighbours * 2 + 1)
  }
  handleClick = (page) => (e) => {
    e.preventDefault()
    this.goToPage(page)
  }
  goToPage(page) {
    const { totalSize } = this.props;
    let currentPage = Math.max(0,Math.min(totalSize, page))
    this.setState({ currentPage },() => this.props.onPageChanged(currentPage))
  }
  range = (from,to,step=1) => {
    let i = from
    let range = []
    while(i<= to) {
      range.push(i)
      i += step
    }

    return range;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage:nextProps.currentPage
    })
  }
  fetchPageNumbers() {
    const {totalSize,pageNeighbours} = this.props;
    const { currentPage } = this.state;
    let totalNumbers = (pageNeighbours * 2) + 3
    let totalBlocks = totalNumbers + 2;
    if(totalSize > totalBlocks) {
      let beforeLastPage = totalSize - 1
      let startPage = Math.max(1,currentPage - pageNeighbours)
      let endPage = Math.min(totalSize - 1, currentPage + pageNeighbours)
      let pages = this.range(startPage,endPage)

      let leftSpill = startPage > 1;
      let rightSpill = endPage < beforeLastPage
      let offSet = totalNumbers - pages.length - 1

      switch (true) {
        case (leftSpill && !rightSpill): {
          let extraPages = this.range(startPage - offSet, startPage - 1)
          pages = [LEFT_PAGE,...extraPages,...pages]
          break;
        }

        case (rightSpill && !leftSpill):{
          let extraPages = this.range(endPage + 1, endPage + offSet)
          pages = [...pages,...extraPages,RIGHT_PAGE]
          break;
        }

        case (rightSpill && leftSpill):

        default: {
          pages = [LEFT_PAGE,...pages,RIGHT_PAGE]
        }

      }

      return [0,...pages,totalSize]
    }

    return this.range(0,totalSize)
  }
  render(){
    if(!this.props.totalSize) return null;
    const { currentPage } = this.state;
    let pages = this.fetchPageNumbers()
    return (
      <div className={styles['pagination-prt']}>
        <>
          <ul className={`${styles['pagination-list']} ${styles['pl-0']} ${styles['flex']}`}>
            {
              pages.map((page,index) => {
                if(page === 'LEFT_PAGE') {
                  return (
                    <li key={index} >
                    <a
                      href="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  )
                }

                if(page === 'RIGHT_PAGE'){
                  return (
                    <li key={index} className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={this.handleMoveRight}
                      >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">{PERSONAL_INFO_MODAL.NEXT}</span>
                      </a>
                    </li>
                  )
                }

                return (
                  <li
                  key={index}
                  className={`${currentPage === page ? styles.active : ''}`}
                  >
                  <a
                    href="#"
                    onClick={this.handleClick(page)}
                  >
                    {page + 1}
                  </a>
                </li>
                )

              })
            }
          </ul>
        </>
      </div>
    )
  }
}

Pagination.propTypes = {
  totalSize:PropTypes.number.isRequired,
  pageNeighbours:PropTypes.number,
  onPageChanged:PropTypes.func,
  currentPage:PropTypes.number
}
Pagination.defaultProps = {
  pageNeighbours:1,
  currentPage:0
}
